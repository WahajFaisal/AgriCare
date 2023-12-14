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
const dbconfig_1 = __importDefault(require("../../config/dbconfig"));
const conversation_1 = require("../../entities/conversation");
const convoRepo = dbconfig_1.default.getRepository(conversation_1.Conversation);
const router = express_1.default.Router();
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, message, time } = req.body;
        if (!name || !message) {
            return res.status(202).json({ message: "Miss Fields" });
        }
        const convo = new conversation_1.Conversation();
        convo.name = name;
        convo.message = message;
        convo.time = time;
        yield convoRepo.save(convo);
        res.status(201).json({ message: "Added" });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/view", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield convoRepo.find();
        res.status(201).json({ data: messages });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
exports.default = router;
