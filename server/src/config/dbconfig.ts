import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Crop } from "../entities/crop";
import { Bid } from "../entities/bid";
import { Conversation } from "../entities/conversation";
import { Instruction } from "../entities/instruction";
import { Notification } from "../entities/notification";
import { Blog } from "../entities/blog";
import { Order } from "../entities/order";
import { Contact } from "../entities/contact";
import { Inspection } from "../entities/inspection";
import { OTP } from "../entities/otp";

const AppData = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "agricare",
  entities: [
    User,
    Crop,
    Bid,
    Instruction,
    Notification,
    Blog,
    Order,
    Conversation,
    Contact,
    Inspection,
    OTP,
  ],
  synchronize: true,
  // logging: true,
});

export default AppData;
