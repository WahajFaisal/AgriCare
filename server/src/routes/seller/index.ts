import express, { Request, Response } from 'express';
import cropRouter from './crop';
import inspectionRouter from './inspection';

const router = express.Router();

router.use("/crop", cropRouter);
router.use("/inspection",inspectionRouter);

export default router;