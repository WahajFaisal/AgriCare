import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AppData from "../config/dbconfig";
import { User } from "../entities/user";
const userRepo = AppData.getRepository(User);

const checkAuthSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenData = req.body.tokenData;
    const id = req.body.userId;
    const secretKey = "hgvdfvdf&&h888$^%&";
    if (!tokenData) return res.status(400).json({ messsage: "Provide Token" });

    const responseData = jwt.verify(tokenData, secretKey);
    if (responseData) {
      next();
    } else {
      res.status(400).json({ message: "Not Authenticated" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

const checkAuthBuyer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenData = req.body.tokenData;
    const secretKey = "hgvdfvdf&&h888$^%&";
    if (!tokenData) return res.status(400).json({ messsage: "Provide Token" });

    const responseData = jwt.verify(tokenData, secretKey);

    if (responseData) {
      const userData = await userRepo.findOne({ where: { token: tokenData } });
      if (userData?.role == "buyer") {
        req.body.userId = userData?.id;
        next();
      } else {
        res.status(400).json({ message: "Not Authenticated" });
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

const checkAuthExpert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenData = req.body.tokenData;
    console.log(tokenData);
    const secretKey = "hgvdfvdf&&h888$^%&";
    if (!tokenData) return res.status(400).json({ messsage: "Provide Token" });
    const responseData = jwt.verify(tokenData, secretKey);
    if (responseData) {
      const userData = await userRepo.findOne({ where: { token: tokenData } });
      if (userData?.role == "expert") {
        req.body.userId = userData?.id;
        console.log("verify");
        next();
      } else {
        res.status(400).json({ message: "Not Authenticated" });
      }
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
};

const checkAuthAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenData = req.body.tokenData;
    const secretKey = "yuio98&jbvc";
    if (!tokenData) return res.status(400).json({ messsage: "Provide Token" });

    const responseData = jwt.verify(tokenData, secretKey);
    if (responseData) {
      next();
    } else {
      res.status(400).json({ message: "Not Authenticated" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

const returnObj = {
  checkAuthBuyer,
  checkAuthSeller,
  checkAuthExpert,
  checkAuthAdmin,
};

export default returnObj;
