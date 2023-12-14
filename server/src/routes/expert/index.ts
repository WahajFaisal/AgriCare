import express from "express";
import instructionRoute from "./instruction";

const router = express.Router();

router.use("/instruction", instructionRoute);

export default router;
