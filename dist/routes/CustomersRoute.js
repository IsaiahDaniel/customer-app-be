"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CustomerController_1 = require("../controllers/CustomerController");
const router = express_1.default.Router();
router.post("/", CustomerController_1.createCustomer);
router.get("/", CustomerController_1.getCustomers);
router.get("/byName", CustomerController_1.searchCustomer);
router.get("/:id", CustomerController_1.getCustomer);
router.patch("/:id", CustomerController_1.updateCustomer);
router.delete("/:id", CustomerController_1.deleteCustomer);
exports.default = router;
