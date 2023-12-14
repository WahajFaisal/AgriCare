import express, { Request, Response } from "express";
import AppData from "../../config/dbconfig";
import { Conversation } from "../../entities/conversation";

const convoRepo = AppData.getRepository(Conversation);

const router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  try {
    const { name, message, time } = req.body;
    if (!name || !message) {
      return res.status(202).json({ message: "Miss Fields" });
    }
    const convo = new Conversation();
    convo.name = name;
    convo.message = message;
    convo.time = time;
    await convoRepo.save(convo);
    res.status(201).json({ message: "Added" });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/view", async (req: Request, res: Response) => {
  try {
    const messages = await convoRepo.find();
    res.status(201).json({ data: messages });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
