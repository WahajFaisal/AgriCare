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
const user_1 = require("../../entities/user");
const bid_1 = require("../../entities/bid");
const cropRepo = dbconfig_1.default.getRepository(crop_1.Crop);
const userRepo = dbconfig_1.default.getRepository(user_1.User);
const bidRepo = dbconfig_1.default.getRepository(bid_1.Bid);
const router = express_1.default.Router();
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // console.log("hiit");
        let allProduct = yield cropRepo.find();
        let allBid;
        let user;
        let bid = 0;
        console.log(allProduct);
        for (let i = 0; i < allProduct.length; i++) {
            bid = 0;
            allBid = yield bidRepo.find({
                where: { product: allProduct[i].id },
                select: ["myPrice"],
                order: { myPrice: "DESC" },
                take: 1,
            });
            if (allBid[0]) {
                allProduct[i]["latestBid"] = allBid[0].myPrice;
            }
            else {
                allProduct[i]["latestBid"] = 0;
            }
            user = yield userRepo.findOne({
                where: { id: allProduct[i].sellerId },
            });
            if ((user === null || user === void 0 ? void 0 : user.totalRate) == 0) {
                allProduct[i]["rate"] = "new";
            }
            else {
                let rate = (_a = user === null || user === void 0 ? void 0 : user.rate) !== null && _a !== void 0 ? _a : 0;
                let totalRate = (_b = user === null || user === void 0 ? void 0 : user.totalRate) !== null && _b !== void 0 ? _b : 0;
                let rating = totalRate !== 0 ? rate / totalRate : 0;
                allProduct[i]["rate"] = rating;
            }
        }
        // console.log(allProduct);
        res.status(201).json({ data: allProduct });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
    }
}));
router.post("/rateAFarmer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { farmerId, rating } = req.body;
        farmerId = parseInt(farmerId);
        const user = yield userRepo.findOne({ where: { id: farmerId } });
        if (user) {
            if (!user.rate) {
                user.rate = 0;
            }
            if (!user.totalRate) {
                user.totalRate = 0;
            }
            user.rate = user.rate + rating;
            user.totalRate = user.totalRate + 1;
            yield userRepo.save(user);
            res.status(201).json({ data: {} });
        }
        else {
            return res.status(401).json({ message: "Not Found" });
        }
        if (!farmerId || !rating) {
            return res.status(401).json({ message: "Miss Fields" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
exports.default = router;
