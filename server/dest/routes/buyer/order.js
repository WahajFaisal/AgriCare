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
const order_1 = require("../../entities/order");
const bid_1 = require("../../entities/bid");
const orderRepo = dbconfig_1.default.getRepository(order_1.Order);
const bidRepo = dbconfig_1.default.getRepository(bid_1.Bid);
const router = express_1.default.Router();
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buyerId, productId, price, bidId } = req.body;
        console.log(req.body);
        if (!buyerId || !price || !productId) {
            return res.status(400).json({ err: "Fill All" });
        }
        const order = yield orderRepo.create({
            buyerId: parseInt(buyerId),
            price: parseInt(price),
            productId: parseInt(productId),
            status: "Order Placed",
        });
        const data = yield orderRepo.save(order);
        const bid = yield bidRepo.findOne({ where: { id: bidId } });
        if (bid) {
            yield bidRepo.remove(bid);
        }
        return res.status(201).json({ data });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.toString() });
    }
}));
router.get("/myOrders/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buyerId = parseInt(req.params.id);
        const allOrders = yield orderRepo.find({ where: { buyerId: buyerId } });
        res.status(201).json({ data: allOrders });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/view/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = parseInt(req.params.id);
        // console.log(orderId);
        const order = yield orderRepo.findOne({ where: { id: orderId } });
        // console.log(order);
        res.status(201).json({ data: order });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
exports.default = router;
