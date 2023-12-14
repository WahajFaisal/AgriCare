import AppData from "../../config/dbconfig";
import { Notification } from "../../entities/notification";
import express, { Request, Response } from "express";

const notificationRepo = AppData.getRepository(Notification);

const router = express.Router();

router.post("/addNotification", async (req: Request, res: Response) => {
  try {
    const { productId, buyerId, message } = req.body;
    const notification = new Notification();
    notification.buyerId = buyerId;
    notification.productId = productId;
    notification.message = message;
    await notificationRepo.save(notification);
    res.status(201).json({ data: notification });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/notifications", async (req, res) => {
  try {
    const allNotifications = await notificationRepo.find();
    let returnNotification = [];
    for (let i = 0; allNotifications.length < 10 ? allNotifications : 10; i++) {
      returnNotification.push(allNotifications[i]);
    }
    console.log(returnNotification);
    res.status(201).json({ data: returnNotification });
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
