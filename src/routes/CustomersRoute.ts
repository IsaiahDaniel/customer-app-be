import express from "express";
import { createCustomer, deleteCustomer, getCustomer, getCustomers, searchCustomer, updateCustomer } from "../controllers/CustomerController";

const router = express.Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/byName", searchCustomer);
router.get("/:id", getCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;