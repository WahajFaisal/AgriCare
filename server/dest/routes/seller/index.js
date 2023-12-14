"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crop_1 = __importDefault(require("./crop"));
const inspection_1 = __importDefault(require("./inspection"));
const router = express_1.default.Router();
router.use("/crop", crop_1.default);
router.use("/inspection", inspection_1.default);
exports.default = router;
