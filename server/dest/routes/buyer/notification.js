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
const dbconfig_1 = __importDefault(require("../../config/dbconfig"));
const notification_1 = require("../../entities/notification");
const express_1 = __importDefault(require("express"));
const notificationRepo = dbconfig_1.default.getRepository(notification_1.Notification);
const router = express_1.default.Router();
router.post("/addNotification", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, buyerId, message } = req.body;
        const notification = new notification_1.Notification();
        notification.buyerId = buyerId;
        notification.productId = productId;
        notification.message = message;
        yield notificationRepo.save(notification);
        res.status(201).json({ data: notification });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.get("/notifications", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allNotifications = yield notificationRepo.find();
        let returnNotification = [];
        for (let i = 0; allNotifications.length < 10 ? allNotifications : 10; i++) {
            returnNotification.push(allNotifications[i]);
        }
        console.log(returnNotification);
        res.status(201).json({ data: returnNotification });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
exports.default = router;
