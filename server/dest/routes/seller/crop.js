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
const crop_1 = require("../../entities/crop");
const jwtAuth_1 = __importDefault(require("../../middlewares/jwtAuth"));
const user_1 = require("../../entities/user");
const cropRepo = dbconfig_1.default.getRepository(crop_1.Crop);
const userRepo = dbconfig_1.default.getRepository(user_1.User);
const router = express_1.default.Router();
router.post("/add", jwtAuth_1.default.checkAuthSeller, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, quantity, location, category, moisture, type, } = req.body;
    if (!name ||
        !description ||
        !price ||
        !quantity ||
        !location ||
        !category ||
        !moisture ||
        !type) {
        return res.status(401).json({ message: "Error" });
    }
    let regex = /^[a-zA-Z ]*$/;
    if (!regex.test(name)) {
        return res.status(400).json({ message: "Error" });
    }
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
    const sellerId = req.body.userId;
    const user = yield userRepo.findOne({
        where: { verify: true, id: sellerId },
    });
    if (!user) {
        return res.status(400).json({ message: "User Not Verify" });
    }
    try {
        const cropData = yield cropRepo.create({
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            location: location,
            sellerId: sellerId,
            category: category,
            approved: false,
            quality: quality,
            moisture: moisture,
            type: type,
        });
        const added = yield cropRepo.save(cropData);
        res.status(201).json({ data: added });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/viewAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const crops = yield cropRepo.find({ where: { approved: true } });
        res.status(201).json({ data: crops });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/view/:id/:sellerId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let productId = req.params.id;
        let id = Number(productId);
        let sellerId = req.params.sellerId;
        let seller = Number(sellerId);
        const data = yield cropRepo.findOne({
            where: { id: id, sellerId: seller },
        });
        res.status(201).json({ data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
    }
}));
router.post("/update/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.productId);
        const { name, description, price, quantity, location, category, moisture, type, } = req.body;
        console.log(moisture);
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
            data.type = type;
            const p = yield cropRepo.save(data);
            res.status(201).json({ data: p });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/view/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let productId = req.params.id;
        let id = Number(productId);
        const data = yield cropRepo.findOne({
            where: { id: id },
        });
        res.status(201).json({ data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/seller/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellerId = Number(req.params.id);
        const crops = yield cropRepo.find({ where: { sellerId } });
        res.status(201).json({ message: "Data is here", data: crops });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", success: false });
    }
}));
exports.default = router;
