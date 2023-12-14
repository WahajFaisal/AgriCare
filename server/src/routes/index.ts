import express from "express";
import authIndex from "./auth/index";
import sellerIndex from "./seller/index";
import buyerIndex from "./buyer/index";
import expertIndex from "./expert/index";
import adminIndex from "./admin/index";

const router = express.Router();

router.use("/authentication", authIndex);
router.use("/seller", sellerIndex);
router.use("/buyer", buyerIndex);
router.use("/expert", expertIndex);
router.use("/admin", adminIndex);

export default router;
