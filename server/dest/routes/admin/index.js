"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const crop_1 = __importDefault(require("./crop"));
const auth_1 = __importDefault(require("./auth"));
const blog_1 = __importDefault(require("./blog"));
const order_1 = __importDefault(require("./order"));
const router = express_1.default.Router();
router.use("/auth", auth_1.default);
router.use("/user", user_1.default);
router.use("/crop", crop_1.default);
router.use("/blog", blog_1.default);
router.use("/order", order_1.default);
exports.default = router;
