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
const orderRepo = dbconfig_1.default.getRepository(order_1.Order);
const router = express_1.default.Router();
router.post("/changeStatus/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hii");
        const orderId = parseInt(req.params.id);
        const status = yield req.body.status;
        if (!status) {
            return res.status(400).json({ message: "Status Miss" });
        }
        const order = yield orderRepo.findOne({ where: { id: orderId } });
        if (order) {
            order.status = status;
            yield orderRepo.save(order);
        }
        res.status(201).json({ message: "Updated" });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/allOrders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrders = yield orderRepo.find();
        res.status(201).json({ data: allOrders });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
exports.default = router;
