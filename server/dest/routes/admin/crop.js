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
const crop_1 = require("../../entities/crop");
const dbconfig_1 = __importDefault(require("../../config/dbconfig"));
const cropRepo = dbconfig_1.default.getRepository(crop_1.Crop);
const router = express_1.default.Router();
router.get("/allCrop", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const crops = yield cropRepo.find();
        res.status(201).json({ data: crops });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/deleteCrop/:cropId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cropId = parseInt(req.params.cropId);
        const cond = { id: cropId };
        yield cropRepo.delete(cond);
        res.status(201).json({ data: "Deleted" });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.post("/update/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.productId);
        const { name, description, price, quantity, location, category, moisture } = req.body;
        const data = yield cropRepo.findOne({ where: { id: id } });
        let quality = "X";
        if (moisture <= 5) {
            quality = "A";
        }
        else if (moisture > 5 && moisture <= 8) {
            quality = "B";
        }
        else {
            quality = "C";
        }
        if (data) {
            data.name = name;
            data.price = price;
            data.description = description;
            data.category = category;
            data.location = location;
            data.quantity = quantity;
            data.moisture = moisture;
            data.quality = quality;
            const p = yield cropRepo.save(data);
            res.status(201).json({ data: p });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/approve/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.productId);
        const data = yield cropRepo.findOne({ where: { id: id } });
        if (data) {
            data.approved = true;
            yield cropRepo.save(data);
            res.status(201).json({ data: data });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/allCrops", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCrops = yield cropRepo.find();
        res.status(201).json({ data: allCrops.length });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/getFarmer/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id);
        const crop = yield cropRepo.findOne({ where: { id: productId } });
        res.status(201).json({ data: crop === null || crop === void 0 ? void 0 : crop.sellerId });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
exports.default = router;
