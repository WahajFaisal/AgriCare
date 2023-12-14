import express, { Request, Response } from "express";
import { User } from "../../entities/user";
import AppData from "../../config/dbconfig";
import { Contact } from "../../entities/contact";
const userRepo = AppData.getRepository(User);
const contactRepo = AppData.getRepository(Contact);
const router = express.Router();
import nodemailer from "nodemailer";

router.get("/allUsers", async (req: Request, res: Response) => {
  try {
    const data = await userRepo.find();
    console.log(data);
    res.status(201).json({ data: data });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/allExperts", async (req: Request, res: Response) => {
  try {
    const experts = await userRepo.find({ where: { role: "expert" } });
    res.status(201).json({ data: experts });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/deleteUser/:id", async (req: Request, res: Response) => {
  try {
    console.log("object");
    const userID = parseInt(req.params.id);
    const cond = { id: userID };
    await userRepo.delete(cond);
    res.status(201).json({ data: "Deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/verifyUser/:id", async (req: Request, res: Response) => {
  try {
    // console.log("JJJU");
    const userID = parseInt(req.params.id);
    console.log(userID, "");
    let user = await userRepo.findOne({ where: { id: userID } });
    // console.log(user);
    if (user) {
      user.verify = true;
      await userRepo.save(user);
      return res.status(201).json({ data: "Veri" });
    }
    res.status(204).json({ data: "NO" });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = await userRepo.findOne({ where: { id: id } });
    // console.log(data);
    return res.status(201).json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/allBuyers", async (req: Request, res: Response) => {
  try {
    const allBuyers = await userRepo.find({ where: { role: "buyer" } });
    res.status(201).json({ data: allBuyers.length });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/allFarmers", async (req: Request, res: Response) => {
  try {
    const allFarmers = await userRepo.find({ where: { role: "farmer" } });
    res.status(201).json({ data: allFarmers.length });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/addContact", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Not All" });
    }
    const contact = await contactRepo.create({
      name: name,
      email: email,
      message: message,
    });
    // sendEmail(email);
    await contactRepo.save(contact);
    res.status(201).json({ message: "Added" });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
