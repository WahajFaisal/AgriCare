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
const bid_1 = require("../../entities/bid");
const notification_1 = require("../../entities/notification");
const dbconfig_1 = __importDefault(require("../../config/dbconfig"));
const bidRepo = dbconfig_1.default.getRepository(bid_1.Bid);
const notificationRepo = dbconfig_1.default.getRepository(notification_1.Notification);
const router = express_1.default.Router();
const jwtAuth_1 = __importDefault(require("../../middlewares/jwtAuth"));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buyerId, myPrice, product } = req.body;
        // console.log(req.body);
        if (!buyerId || !myPrice || !product) {
            return res.status(400).json({ err: "Fill All" });
        }
        const bid = yield bidRepo.create({
            buyerId: buyerId,
            myPrice: myPrice,
            product: product,
        });
        const notification = new notification_1.Notification();
        notification.buyerId = buyerId;
        notification.productId = product;
        notification.message = `${buyerId} Buyer makes Bid on ${product} Crop for ${myPrice}`;
        yield notificationRepo.save(notification);
        const data = yield bidRepo.save(bid);
        res.status(201).json({ data });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/viewAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBids = yield bidRepo.find();
        res.status(201).json({ data: allBids });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/view/:id", jwtAuth_1.default.checkAuthBuyer, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        const data = yield bidRepo.find({ where: { buyerId: userId } });
        console.log(data);
        res.status(201).json({ data });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.delete("/remove/:id", jwtAuth_1.default.checkAuthBuyer, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const id = parseInt(req.params.id);
        const data = yield bidRepo.findOne({
            where: { id: id, buyerId: userId },
        });
        if (!data) {
            res.status(400).json({ error: "Not Found" });
        }
        else {
            const deletedData = yield bidRepo.delete({ id: data.id });
            res.status(201).json({ message: "Deleted" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/bidPrice/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = Number(req.params.id);
        const product = yield bidRepo.find({ where: { product: productId } });
        if (product.length != 0) {
            let price = [];
            for (let i = 0; i < product.length; i++) {
                price.push(product[i].myPrice);
            }
            price.sort((a, b) => b - a);
            return res.status(201).json({ data: price[0] });
        }
        else {
            return res.status(201).json({ data: 0 });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/bidProduct/:pid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.pid);
        const products = yield bidRepo.find({ where: { product: productId } });
        return res.status(201).json({ data: products });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
exports.default = router;
