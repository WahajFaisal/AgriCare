import express, { Request, Response } from "express";
import AppData from "../../config/dbconfig";
import { Order } from "../../entities/order";
const orderRepo = AppData.getRepository(Order);

const router = express.Router();

router.post("/changeStatus/:id", async (req: Request, res: Response) => {
  try {
    console.log("hii");
    const orderId = parseInt(req.params.id);
    const status = await req.body.status;
    if (!status) {
      return res.status(400).json({ message: "Status Miss" });
    }
    const order = await orderRepo.findOne({ where: { id: orderId } });
    if (order) {
      order.status = status;
      await orderRepo.save(order);
    }
    res.status(201).json({ message: "Updated" });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/allOrders", async (req: Request, res: Response) => {
  try {
    const allOrders = await orderRepo.find();
    res.status(201).json({ data: allOrders });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
