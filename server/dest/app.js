"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const dbconfig_1 = __importDefault(require("./config/dbconfig"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path = require("path");
const envPath = path.join(__dirname, "../config.env");
dotenv_1.default.config({ path: envPath });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/", index_1.default);
dbconfig_1.default.initialize()
    .then(() => {
    app.listen(8000, () => {
        console.log("Listening and Connected");
    });
})
    .catch((err) => {
    console.log("error ", err);
});
