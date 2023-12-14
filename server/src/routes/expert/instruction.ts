import express, { Request, Response } from "express";
import { Instruction } from "../../entities/instruction";
import AppData from "../../config/dbconfig";
import returnObj from "../../middlewares/jwtAuth";
const instructionRepo = AppData.getRepository(Instruction);

const router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  const content = req.body.content;
  try {
    const expertId = req.body.userId;
    const newInstruction = await instructionRepo.create({
      expertId: expertId,
      content: content,
    });
    await instructionRepo.save(newInstruction);
    res.status(201).json({ message: "Added" });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const data = await instructionRepo.find();
    console.log(data);
    res.status(201).json({ data: data });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
