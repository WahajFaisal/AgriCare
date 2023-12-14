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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbconfig_1 = __importDefault(require("../config/dbconfig"));
const user_1 = require("../entities/user");
const userRepo = dbconfig_1.default.getRepository(user_1.User);
const checkAuthSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenData = req.body.tokenData;
        const id = req.body.userId;
        const secretKey = "hgvdfvdf&&h888$^%&";
        if (!tokenData)
            return res.status(400).json({ messsage: "Provide Token" });
        const responseData = jsonwebtoken_1.default.verify(tokenData, secretKey);
        if (responseData) {
            next();
        }
        else {
            res.status(400).json({ message: "Not Authenticated" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});
const checkAuthBuyer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenData = req.body.tokenData;
        const secretKey = "hgvdfvdf&&h888$^%&";
        if (!tokenData)
            return res.status(400).json({ messsage: "Provide Token" });
        const responseData = jsonwebtoken_1.default.verify(tokenData, secretKey);
        if (responseData) {
            const userData = yield userRepo.findOne({ where: { token: tokenData } });
            if ((userData === null || userData === void 0 ? void 0 : userData.role) == "buyer") {
                req.body.userId = userData === null || userData === void 0 ? void 0 : userData.id;
                next();
            }
            else {
                res.status(400).json({ message: "Not Authenticated" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});
const checkAuthExpert = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenData = req.body.tokenData;
        console.log(tokenData);
        const secretKey = "hgvdfvdf&&h888$^%&";
        if (!tokenData)
            return res.status(400).json({ messsage: "Provide Token" });
        const responseData = jsonwebtoken_1.default.verify(tokenData, secretKey);
        if (responseData) {
            const userData = yield userRepo.findOne({ where: { token: tokenData } });
            if ((userData === null || userData === void 0 ? void 0 : userData.role) == "expert") {
                req.body.userId = userData === null || userData === void 0 ? void 0 : userData.id;
                console.log("verify");
                next();
            }
            else {
                res.status(400).json({ message: "Not Authenticated" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
    }
});
const checkAuthAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenData = req.body.tokenData;
        const secretKey = "yuio98&jbvc";
        if (!tokenData)
            return res.status(400).json({ messsage: "Provide Token" });
        const responseData = jsonwebtoken_1.default.verify(tokenData, secretKey);
        if (responseData) {
            next();
        }
        else {
            res.status(400).json({ message: "Not Authenticated" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});
const returnObj = {
    checkAuthBuyer,
    checkAuthSeller,
    checkAuthExpert,
    checkAuthAdmin,
};
exports.default = returnObj;
