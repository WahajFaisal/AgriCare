import express, { Request, Response } from "express";
import { Crop } from "../../entities/crop";
import returnObj from "../../middlewares/jwtAuth";
import AppData from "../../config/dbconfig";
import { User } from "../../entities/user";
import { Bid } from "../../entities/bid";
const cropRepo = AppData.getRepository(Crop);
const userRepo = AppData.getRepository(User);
const bidRepo = AppData.getRepository(Bid);

const router = express.Router();

router.get("/all", async (req: Request, res: Response) => {
  try {
    // console.log("hiit");
    let allProduct: any = await cropRepo.find();
    let allBid;
    let user;
    let bid = 0;
    console.log(allProduct);
    for (let i = 0; i < allProduct.length; i++) {
      bid = 0;
      allBid = await bidRepo.find({
        where: { product: allProduct[i].id },
        select: ["myPrice"],
        order: { myPrice: "DESC" },
        take: 1,
      });
      if (allBid[0]) {
        allProduct[i]["latestBid"] = allBid[0].myPrice;
      } else {
        allProduct[i]["latestBid"] = 0;
      }
      user = await userRepo.findOne({
        where: { id: allProduct[i].sellerId },
      });
      if (user?.totalRate == 0) {
        allProduct[i]["rate"] = "new";
      } else {
        let rate: number = user?.rate ?? 0;
        let totalRate: number = user?.totalRate ?? 0;
        let rating: number = totalRate !== 0 ? rate / totalRate : 0;
        allProduct[i]["rate"] = rating;
      }
    }
    // console.log(allProduct);
    res.status(201).json({ data: allProduct });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/rateAFarmer", async (req: Request, res: Response) => {
  try {
    let { farmerId, rating } = req.body;
    farmerId = parseInt(farmerId);
    const user = await userRepo.findOne({ where: { id: farmerId } });
    if (user) {
      if (!user.rate) {
        user.rate = 0;
      }
      if (!user.totalRate) {
        user.totalRate = 0;
      }
      user.rate = user.rate + rating;
      user.totalRate = user.totalRate + 1;
      await userRepo.save(user);
      res.status(201).json({ data: {} });
    } else {
      return res.status(401).json({ message: "Not Found" });
    }
    if (!farmerId || !rating) {
      return res.status(401).json({ message: "Miss Fields" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
