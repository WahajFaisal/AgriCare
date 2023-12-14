import express from "express";
import bidRouter from "./bid";
import cropRouter from "./crop";
import notificationRouter from "./notification";
import orderRouter from "./order";
import convoRouter from "./conversation";

const router = express.Router();

router.use("/bid", bidRouter);
router.use("/crop", cropRouter);
router.use("/notification", notificationRouter);
router.use("/order", orderRouter);
router.use("/conversation", convoRouter);

export default router;
