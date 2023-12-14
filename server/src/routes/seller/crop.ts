import express, { Request, Response } from "express";
import AppData from "../../config/dbconfig";
import { Crop } from "../../entities/crop";
import returnObj from "../../middlewares/jwtAuth";
import { User } from "../../entities/user";
const cropRepo = AppData.getRepository(Crop);
const userRepo = AppData.getRepository(User);
const router = express.Router();

router.post(
  "/add",
  returnObj.checkAuthSeller,
  async (req: Request, res: Response) => {
    const {
      name,
      description,
      price,
      quantity,
      location,
      category,
      moisture,
      type,
    } = req.body;
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !location ||
      !category ||
      !moisture ||
      !type
    ) {
      return res.status(401).json({ message: "Error" });
    }
    let regex = /^[a-zA-Z ]*$/;
    if (!regex.test(name)) {
      return res.status(400).json({ message: "Error" });
    }
    let quality = "X";
    if (moisture <= 5) {
      quality = "A";
    } else if (moisture > 5 && moisture <= 8) {
      quality = "B";
    } else {
      quality = "C";
    }
    const sellerId = req.body.userId;
    const user = await userRepo.findOne({
      where: { verify: true, id: sellerId },
    });
    if (!user) {
      return res.status(400).json({ message: "User Not Verify" });
    }
    try {
      const cropData = await cropRepo.create({
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        location: location,
        sellerId: sellerId,
        category: category,
        approved: false,
        quality: quality,
        moisture: moisture,
        type: type,
      });
      const added = await cropRepo.save(cropData);
      res.status(201).json({ data: added });
    } catch (error: any) {
      res.status(500).json({ error: error.toString() });
    }
  }
);

router.get("/viewAll", async (req: Request, res: Response) => {
  try {
    const crops = await cropRepo.find({ where: { approved: true } });
    res.status(201).json({ data: crops });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/view/:id/:sellerId", async (req: Request, res: Response) => {
  try {
    let productId = req.params.id;
    let id = Number(productId);
    let sellerId = req.params.sellerId;
    let seller = Number(sellerId);
    const data = await cropRepo.findOne({
      where: { id: id, sellerId: seller },
    });
    res.status(201).json({ data });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/update/:productId", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.productId);
    const {
      name,
      description,
      price,
      quantity,
      location,
      category,
      moisture,
      type,
    } = req.body;
    console.log(moisture);
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
      data.type = type;
      const p = await cropRepo.save(data);
      res.status(201).json({ data: p });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/view/:id", async (req: Request, res: Response) => {
  try {
    let productId = req.params.id;
    let id = Number(productId);
    const data = await cropRepo.findOne({
      where: { id: id },
    });
    res.status(201).json({ data });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/seller/:id", async (req: Request, res: Response) => {
  try {
    const sellerId = Number(req.params.id);
    const crops = await cropRepo.find({ where: { sellerId } });

    res.status(201).json({ message: "Data is here", data: crops });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
});

export default router;
