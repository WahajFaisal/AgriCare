import express, { Request, Response } from "express";
import userRouter from "./user";
import cropRouter from "./crop";
import authRouter from "./auth";
import blogRouter from "./blog";
import orderRouter from "./order";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/crop", cropRouter);
router.use("/blog", blogRouter);
router.use("/order", orderRouter);

export default router;
