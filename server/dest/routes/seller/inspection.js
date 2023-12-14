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
const inspection_1 = require("../../entities/inspection");
const router = express_1.default.Router();
const inspectionRepo = dbconfig_1.default.getRepository(inspection_1.Inspection);
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { crop, cropId, sellerId } = req.body;
        if (!crop || !cropId || !sellerId) {
            return res.status(201).json({ success: false, message: "Fill All Details" });
        }
        const exist = yield inspectionRepo.findOne({ where: { crop, cropId, sellerId } });
        if (exist) {
            return res.status(201).json({ message: "Already Requested" });
        }
        const inspection = new inspection_1.Inspection();
        inspection.crop = crop;
        inspection.cropId = cropId;
        inspection.sellerId = sellerId;
        const data = yield inspectionRepo.save(inspection);
        res.status(201).json({ success: true, message: 'Request Added', data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}));
exports.default = router;
