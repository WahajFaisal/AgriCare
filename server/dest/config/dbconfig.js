"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const crop_1 = require("../entities/crop");
const bid_1 = require("../entities/bid");
const conversation_1 = require("../entities/conversation");
const instruction_1 = require("../entities/instruction");
const notification_1 = require("../entities/notification");
const blog_1 = require("../entities/blog");
const order_1 = require("../entities/order");
const contact_1 = require("../entities/contact");
const inspection_1 = require("../entities/inspection");
const otp_1 = require("../entities/otp");
const AppData = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "agricare",
    entities: [
        user_1.User,
        crop_1.Crop,
        bid_1.Bid,
        instruction_1.Instruction,
        notification_1.Notification,
        blog_1.Blog,
        order_1.Order,
        conversation_1.Conversation,
        contact_1.Contact,
        inspection_1.Inspection,
        otp_1.OTP,
    ],
    synchronize: true,
    // logging: true,
});
exports.default = AppData;
