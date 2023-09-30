import { Schema, model } from "mongoose";
import { GENDER } from "../constants";

const OrderSchema = new Schema({
    amount: {
        type: Number,
        required: [true, "Order amount is required"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const CustomerSchema = new Schema({
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
    enum: [GENDER.MALE, GENDER.FEMALE],
    required: [true, "Customer gender is required"],
  },
  orders: {
    type: [OrderSchema],
    required: [true, "orders are required"]
  }
});

const Customer = model("customer", CustomerSchema);

export default Customer;
