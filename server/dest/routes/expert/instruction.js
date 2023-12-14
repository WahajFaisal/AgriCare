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
const instruction_1 = require("../../entities/instruction");
const dbconfig_1 = __importDefault(require("../../config/dbconfig"));
const instructionRepo = dbconfig_1.default.getRepository(instruction_1.Instruction);
const router = express_1.default.Router();
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body.content;
    try {
        const expertId = req.body.userId;
        const newInstruction = yield instructionRepo.create({
            expertId: expertId,
            content: content,
        });
        yield instructionRepo.save(newInstruction);
        res.status(201).json({ message: "Added" });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield instructionRepo.find();
        console.log(data);
        res.status(201).json({ data: data });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
exports.default = router;
