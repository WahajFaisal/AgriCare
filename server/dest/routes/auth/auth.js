"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbconfig_1 = __importDefault(require("../../config/dbconfig"));
const user_1 = require("../../entities/user");
const otp_1 = require("../../entities/otp");
const userRepo = dbconfig_1.default.getRepository(user_1.User);
const otpRepo = dbconfig_1.default.getRepository(otp_1.OTP);
const router = express_1.default.Router();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: "talhanaseer290@gmail.com",
        pass: "qgvdaegiaxhivuoi",
    },
});
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, cnic, location, description, role, experties, mongoId, } = req.body;
    try {
        // console.log(req.body);
        if (name && email && password && cnic && location && description && role) {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
            const existingUser = yield userRepo.findOne({ where: { email } });
            if (role == "expert" && !experties) {
                return res.status(202).json({ message: "Experties Required" });
            }
            if (existingUser) {
                return res.status(202).json({ message: "Already exist" });
            }
            else {
                if (validator_1.default.isEmail(email)) {
                    const minLengthRegex = /.{8,}/;
                    const uppercaseRegex = /[A-Z]/;
                    const lowercaseRegex = /[a-z]/;
                    // Check each condition
                    const isMinLengthValid = minLengthRegex.test(password);
                    const isUppercaseValid = uppercaseRegex.test(password);
                    const isLowercaseValid = lowercaseRegex.test(password);
                    if (!isLowercaseValid || !isMinLengthValid || !isUppercaseValid) {
                        return res.status(202).json({ message: "Password Problem" });
                    }
                    let regex = /^[a-zA-Z ]*$/;
                    if (!regex.test(name)) {
                        return res.status(202).json({ message: "Error Name" });
                    }
                    const minLengthRegexCNIC = /.{13,}/;
                    const isCNICLength = minLengthRegexCNIC.test(cnic);
                    if (!isCNICLength || cnic.length < 13 || cnic.length > 13) {
                        return res.status(202).json({ message: "CNIC Problem" });
                    }
                    const newUser = {
                        name: name,
                        email: email,
                        password: hashedPassword,
                        cnic: cnic,
                        location: location,
                        description: description,
                        experties: experties,
                        role: role,
                        verify: false,
                        otpVerify: false,
                        mongoId,
                    };
                    const data = yield userRepo.save(newUser);
                    let otp = Math.floor(100000 + Math.random() * 900000);
                    const otpData = yield otpRepo.create({ email, otp });
                    yield otpRepo.save(otpData);
                    const info = yield transporter.sendMail({
                        from: "talhanaseer290@gmail.com",
                        to: email,
                        subject: "OTP",
                        text: String(otp),
                    });
                    return res.status(201).json({ data });
                }
                else {
                    return res.status(202).json({ message: "Validation Failed" });
                }
            }
        }
        else {
            return res.status(202).json({ message: "Fill All" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.toString() });
    }
}));
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    try {
        const userExist = yield userRepo.findOne({
            where: { email: email, otpVerify: true },
        });
        // console.log(userExist, "exist");
        if (userExist) {
            const userPassword = userExist.password;
            const passwordMatches = yield bcryptjs_1.default.compare(password, userPassword);
            if (passwordMatches) {
                // console.log(passwordMatches, "MM");
                if (userExist.role !== role) {
                    return res.status(202).json({ message: "Not Authenticated" });
                }
                const tokenPayload = {
                    id: userExist.id,
                    username: userExist.name,
                    email: userExist.email,
                    role: userExist.role,
                };
                const secretKey = "hgvdfvdf&&h888$^%&";
                const tokenData = jsonwebtoken_1.default.sign(tokenPayload, secretKey);
                userExist.token = tokenData;
                const dataU = yield userRepo.save(userExist);
                return res.status(201).json({
                    data: {
                        id: dataU.id,
                        verify: dataU.verify,
                        token: dataU.token,
                        role: dataU.role,
                        mongoId: dataU.mongoId,
                    },
                });
            }
            else {
                return res.status(202).json({ message: "Authentication failed" });
            }
        }
        else {
            // console.log("login");
            return res.status(202).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.toString() });
    }
}));
router.post("/enterOtp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const otpE = yield otpRepo.findOne({ where: { email, otp } });
    if (otpE) {
        let user = yield userRepo.findOne({ where: { email } });
        if (user) {
            user.otpVerify = true;
            yield userRepo.save(user);
            // await otpRepo.remove(otpE);
            return res.status(201).json({ message: "Correct" });
        }
    }
    else {
        return res.status(202).json({ message: "OTP failed" });
    }
}));
exports.default = router;
