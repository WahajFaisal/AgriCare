import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log(email, " e");
    // console.log(password, "p");
    if (email == process.env.ADMIN_U && password == process.env.ADMIN_P) {
      const secretA = "yuio98&jbvc";
      const token = jwt.sign(email, secretA);
      res.status(201).json({ data: token });
    } else {
      res.status(400).json({ message: "Invalid Cred" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
