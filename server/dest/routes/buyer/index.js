"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bid_1 = __importDefault(require("./bid"));
const crop_1 = __importDefault(require("./crop"));
const notification_1 = __importDefault(require("./notification"));
const order_1 = __importDefault(require("./order"));
const conversation_1 = __importDefault(require("./conversation"));
const router = express_1.default.Router();
router.use("/bid", bid_1.default);
router.use("/crop", crop_1.default);
router.use("/notification", notification_1.default);
router.use("/order", order_1.default);
router.use("/conversation", conversation_1.default);
exports.default = router;
