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
const blog_1 = require("../../entities/blog");
const dbconfig_1 = __importDefault(require("../../config/dbconfig"));
const blogRepo = dbconfig_1.default.getRepository(blog_1.Blog);
const router = express_1.default.Router();
router.get("/allBlog", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBlogs = yield blogRepo.find();
        res.status(201).json({ data: allBlogs });
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}));
router.post("/addBlog", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    let blog = yield blogRepo.create({ title, blog: content });
    yield blogRepo.save(blog);
    res.status(201).json({ message: "Added" });
}));
router.get("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield blogRepo.delete({ id: id });
        res.status(201).json({ message: "Success" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
            success: false,
            error: error.toString(),
        });
    }
}));
exports.default = router;
