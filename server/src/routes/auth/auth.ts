import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import AppData from "../../config/dbconfig";
import { User } from "../../entities/user";
import { OTP } from "../../entities/otp";
const userRepo = AppData.getRepository(User);
const otpRepo = AppData.getRepository(OTP);
const router = express.Router();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "talhanaseer290@gmail.com",
    pass: "qgvdaegiaxhivuoi",
  },
});

router.post("/register", async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    cnic,
    location,
    description,
    role,
    experties,
    mongoId,
  } = req.body;
  try {
    // console.log(req.body);
    if (name && email && password && cnic && location && description && role) {
      const hashedPassword = await bcrypt.hash(password, 8);
      const existingUser = await userRepo.findOne({ where: { email } });
      if (role == "expert" && !experties) {
        return res.status(202).json({ message: "Experties Required" });
      }
      if (existingUser) {
       return res.status(202).json({ message: "Already exist" });
      } else {
        if (validator.isEmail(email)) {
          const minLengthRegex = /.{8,}/;
          const uppercaseRegex = /[A-Z]/;
          const lowercaseRegex = /[a-z]/;

          // Check each condition
          const isMinLengthValid = minLengthRegex.test(password);
          const isUppercaseValid = uppercaseRegex.test(password);
          const isLowercaseValid = lowercaseRegex.test(password);

          if (!isLowercaseValid || !isMinLengthValid || !isUppercaseValid) {
            return res.status(202).json({ message: "Password Problem" });
          }

          let regex = /^[a-zA-Z ]*$/;

          if (!regex.test(name)) {
            return res.status(202).json({ message: "Error Name" });
          }

          const minLengthRegexCNIC = /.{13,}/;
          const isCNICLength = minLengthRegexCNIC.test(cnic);

          if (!isCNICLength || cnic.length < 13 || cnic.length > 13) {
            return res.status(202).json({ message: "CNIC Problem" });
          }

          const newUser = {
            name: name,
            email: email,
            password: hashedPassword,
            cnic: cnic,
            location: location,
            description: description,
            experties: experties,
            role: role,
            verify: false,
            otpVerify: false,
            mongoId,
          };
          const data = await userRepo.save(newUser);
          let otp = Math.floor(100000 + Math.random() * 900000);
          const otpData = await otpRepo.create({ email, otp });
          await otpRepo.save(otpData);
          const info = await transporter.sendMail({
            from: "talhanaseer290@gmail.com", // sender address
            to: email, // list of receivers
            subject: "OTP", // Subject line
            text: String(otp),
          });
         return res.status(201).json({ data });
        } else {
         return res.status(202).json({ message: "Validation Failed" });
        }
      }
    } else {
      return res.status(202).json({ message: "Fill All" });
    }
  } catch (error: any) {
    console.log(error);
     return res.status(500).json({ error: error.toString() });
  }
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;
    try {
      const userExist = await userRepo.findOne({
        where: { email: email, otpVerify: true },
      });
      // console.log(userExist, "exist");
      if (userExist) {
        const userPassword = userExist.password;
        const passwordMatches = await bcrypt.compare(password, userPassword);
        if (passwordMatches) {
          // console.log(passwordMatches, "MM");
          if (userExist.role !== role) {
            return res.status(202).json({ message: "Not Authenticated" });
          }
          const tokenPayload = {
            id: userExist.id,
            username: userExist.name,
            email: userExist.email,
            role: userExist.role,
          };
          const secretKey = "hgvdfvdf&&h888$^%&";
          const tokenData = jwt.sign(tokenPayload, secretKey);
          userExist.token = tokenData;
          const dataU = await userRepo.save(userExist);
           return res.status(201).json({
            data: {
              id: dataU.id,
              verify: dataU.verify,
              token: dataU.token,
              role: dataU.role,
              mongoId: dataU.mongoId,
            },
          });
        } else {
          
          return res.status(202).json({ message: "Authentication failed" });
        }
      } else {
        // console.log("login");
       
        return res.status(202).json({ message: "User not found" });
      }
    } catch (error: any) {
      console.log(error);
      
      return res.status(500).json({ error: error.toString() });
    }
  }
);

router.post("/enterOtp", async (req, res) => {
  const { email, otp } = req.body;
  const otpE = await otpRepo.findOne({ where: { email, otp } });
  if (otpE) {
    let user = await userRepo.findOne({ where: { email } });
    if (user) {
      user.otpVerify = true;
      await userRepo.save(user);
      // await otpRepo.remove(otpE);
      return res.status(201).json({ message: "Correct" });
    }
  } else {
    return res.status(202).json({ message: "OTP failed" });
  }
});

export default router;
