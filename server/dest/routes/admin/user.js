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
const user_1 = require("../../entities/user");
const dbconfig_1 = __importDefault(require("../../config/dbconfig"));
const contact_1 = require("../../entities/contact");
const userRepo = dbconfig_1.default.getRepository(user_1.User);
const contactRepo = dbconfig_1.default.getRepository(contact_1.Contact);
const router = express_1.default.Router();
router.get("/allUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userRepo.find();
        console.log(data);
        res.status(201).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/allExperts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const experts = yield userRepo.find({ where: { role: "expert" } });
        res.status(201).json({ data: experts });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/deleteUser/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("object");
        const userID = parseInt(req.params.id);
        const cond = { id: userID };
        yield userRepo.delete(cond);
        res.status(201).json({ data: "Deleted" });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/verifyUser/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("JJJU");
        const userID = parseInt(req.params.id);
        console.log(userID, "");
        let user = yield userRepo.findOne({ where: { id: userID } });
        // console.log(user);
        if (user) {
            user.verify = true;
            yield userRepo.save(user);
            return res.status(201).json({ data: "Veri" });
        }
        res.status(204).json({ data: "NO" });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const data = yield userRepo.findOne({ where: { id: id } });
        // console.log(data);
        return res.status(201).json({ data });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/allBuyers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBuyers = yield userRepo.find({ where: { role: "buyer" } });
        res.status(201).json({ data: allBuyers.length });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/allFarmers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allFarmers = yield userRepo.find({ where: { role: "farmer" } });
        res.status(201).json({ data: allFarmers.length });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.post("/addContact", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: "Not All" });
        }
        const contact = yield contactRepo.create({
            name: name,
            email: email,
            message: message,
        });
        // sendEmail(email);
        yield contactRepo.save(contact);
        res.status(201).json({ message: "Added" });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
exports.default = router;
