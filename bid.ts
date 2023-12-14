import express, { Request, Response } from "express";
import { Bid } from "../../entities/bid";
import { Notification } from "../../entities/notification";
import AppData from "../../config/dbconfig";
const bidRepo = AppData.getRepository(Bid);
const notificationRepo = AppData.getRepository(Notification);
const router = express.Router();
import returnObj from "../../middlewares/jwtAuth";

router.post("/add", async (req: Request, res: Response) => {
  try {
    const { buyerId, myPrice, product } = req.body;
    // console.log(req.body);
    if (!buyerId || !myPrice || !product) {
      return res.status(400).json({ err: "Fill All" });
    }
    const bid = await bidRepo.create({
      buyerId: buyerId,
      myPrice: myPrice,
      product: product,
    });
    const notification = new Notification();
    notification.buyerId = buyerId;
    notification.productId = product;
    notification.message = `${buyerId} Buyer makes Bid on ${product} Crop for ${myPrice}`;
    await notificationRepo.save(notification);
    const data = await bidRepo.save(bid);
    res.status(201).json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/viewAll", async (req: Request, res: Response) => {
  try {
    const allBids = await bidRepo.find();
    res.status(201).json({ data: allBids });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get(
  "/view/:id",
  returnObj.checkAuthBuyer,
  async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const data = await bidRepo.find({ where: { buyerId: userId } });
      console.log(data);
      res.status(201).json({ data });
    } catch (error: any) {
      res.status(500).json({ error: error.toString() });
    }
  }
);

router.delete(
  "/remove/:id",
  returnObj.checkAuthBuyer,
  async (req: Request, res: Response) => {
    try {
      const userId = req.body.userId;
      const id = parseInt(req.params.id);
      const data = await bidRepo.findOne({
        where: { id: id, buyerId: userId },
      });
      if (!data) {
        res.status(400).json({ error: "Not Found" });
      } else {
        const deletedData = await bidRepo.delete({ id: data.id });
        res.status(201).json({ message: "Deleted" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.toString() });
    }
  }
);

router.get("/bidPrice/:id", async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const product = await bidRepo.find({ where: { product: productId } });
    if (product.length != 0) {
      let price = [];
      for (let i = 0; i < product.length; i++) {
        price.push(product[i].myPrice);
      }
      price.sort((a: number, b: number) => b - a);
      return res.status(201).json({ data: price[0] });
    } else {
      return res.status(201).json({ data: 0 });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/bidProduct/:pid", async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.pid);
    const products = await bidRepo.find({ where: { product: productId } });
    return res.status(201).json({ data: products });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
