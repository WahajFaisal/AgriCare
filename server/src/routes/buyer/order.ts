import express, { Request, Response } from "express";
import AppData from "../../config/dbconfig";
import { Order } from "../../entities/order";
import { Bid } from "../../entities/bid";

const orderRepo = AppData.getRepository(Order);
const bidRepo = AppData.getRepository(Bid);

const router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  try {
    const { buyerId, productId, price, bidId } = req.body;
    console.log(req.body);
    if (!buyerId || !price || !productId) {
      return res.status(400).json({ err: "Fill All" });
    }
    const order = await orderRepo.create({
      buyerId: parseInt(buyerId),
      price: parseInt(price),
      productId: parseInt(productId),
      status: "Order Placed",
    });
    const data = await orderRepo.save(order);
    const bid = await bidRepo.findOne({ where: { id: bidId } });
    if (bid) {
      await bidRepo.remove(bid);
    }
    return res.status(201).json({ data });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.get("/myOrders/:id", async (req: Request, res: Response) => {
  try {
    const buyerId = parseInt(req.params.id);
    const allOrders = await orderRepo.find({ where: { buyerId: buyerId } });
    res.status(201).json({ data: allOrders });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/view/:id", async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    // console.log(orderId);
    const order = await orderRepo.findOne({ where: { id: orderId } });
    // console.log(order);
    res.status(201).json({ data: order });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
