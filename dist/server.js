"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import morgan from "morgan";
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const db_1 = __importDefault(require("./config/db"));
const CustomersRoute_1 = __importDefault(require("./routes/CustomersRoute"));
const error_1 = __importDefault(require("./middleware/error"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// if(process.env.NODE_ENV === "development"){
//   app.use(morgan("dev"));
// }
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
(0, db_1.default)();
// Routes
app.get('/', (req, res) => res.send('Hello, World!'));
app.use("/api/v1/customers", CustomersRoute_1.default);
app.use(error_1.default);
// Export the Express app instance
exports.default = app;
