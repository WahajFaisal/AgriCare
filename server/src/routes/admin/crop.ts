import express, { Request, Response } from "express";
import { Crop } from "../../entities/crop";
import AppData from "../../config/dbconfig";
import { Tree } from "typeorm";
const cropRepo = AppData.getRepository(Crop);

const router = express.Router();

router.get("/allCrop", async (req: Request, res: Response) => {
  try {
    const crops = await cropRepo.find();
    res.status(201).json({ data: crops });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/deleteCrop/:cropId", async (req: Request, res: Response) => {
  try {
    const cropId = parseInt(req.params.cropId);
    const cond = { id: cropId };
    await cropRepo.delete(cond);
    res.status(201).json({ data: "Deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/update/:productId", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.productId);
    const { name, description, price, quantity, location, category, moisture } =
      req.body;
    const data = await cropRepo.findOne({ where: { id: id } });
    let quality = "X";
    if (moisture <= 5) {
      quality = "A";
    } else if (moisture > 5 && moisture <= 8) {
      quality = "B";
    } else {
      quality = "C";
    }
    if (data) {
      data.name = name;
      data.price = price;
      data.description = description;
      data.category = category;
      data.location = location;
      data.quantity = quantity;
      data.moisture = moisture;
      data.quality = quality;
      const p = await cropRepo.save(data);
      res.status(201).json({ data: p });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/approve/:productId", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.productId);
    const data = await cropRepo.findOne({ where: { id: id } });
    if (data) {
      data.approved = true;
      await cropRepo.save(data);
      res.status(201).json({ data: data });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/allCrops", async (req: Request, res: Response) => {
  try {
    const allCrops = await cropRepo.find();
    res.status(201).json({ data: allCrops.length });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/getFarmer/:id", async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const crop = await cropRepo.findOne({ where: { id: productId } });
    res.status(201).json({ data: crop?.sellerId });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
