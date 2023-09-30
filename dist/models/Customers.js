"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const OrderSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: [true, "Order amount is required"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
const CustomerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Customer name is required"],
    },
    age: {
        type: String,
        required: [true, "Customer name is required"],
    },
    address: {
        type: [{ street: String, postCode: String, houseNumber: Number }],
        required: [true, "Address is required"]
    },
    gender: {
        type: String,
        enum: [constants_1.GENDER.MALE, constants_1.GENDER.FEMALE],
        required: [true, "Customer gender is required"],
    },
    orders: {
        type: [OrderSchema],
        required: [true, "orders are required"]
    }
});
const Customer = (0, mongoose_1.model)("customer", CustomerSchema);
exports.default = Customer;
