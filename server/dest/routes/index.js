"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./auth/index"));
const index_2 = __importDefault(require("./seller/index"));
const index_3 = __importDefault(require("./buyer/index"));
const index_4 = __importDefault(require("./expert/index"));
const index_5 = __importDefault(require("./admin/index"));
const router = express_1.default.Router();
router.use("/authentication", index_1.default);
router.use("/seller", index_2.default);
router.use("/buyer", index_3.default);
router.use("/expert", index_4.default);
router.use("/admin", index_5.default);
exports.default = router;
