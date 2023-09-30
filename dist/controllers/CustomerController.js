"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCustomer = exports.updateCustomer = exports.deleteCustomer = exports.getCustomers = exports.getCustomer = exports.createCustomer = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ErrorMessage_1 = __importDefault(require("../messages/ErrorMessage"));
const Customers_1 = __importDefault(require("../models/Customers"));
const createCustomer = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield Customers_1.default.create(req.body);
    res.status(201).json({ success: true, data: customer });
}));
exports.createCustomer = createCustomer;
const getCustomers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield Customers_1.default.find();
    res.status(200).json({ success: true, data: customers });
}));
exports.getCustomers = getCustomers;
const getCustomer = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _customer = yield Customers_1.default.findById(req.params.id);
    if (!_customer) {
        next(new ErrorMessage_1.default(`No customer with that id ${req.params.id} was found`, 404));
    }
    const customer = yield Customers_1.default.findOne();
    res.status(200).json({ success: true, data: customer });
}));
exports.getCustomer = getCustomer;
const searchCustomer = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    console.log("req.query", req.query);
    if (!name) {
        return next(new ErrorMessage_1.default(`No customer with the name ${name} was found`, 404));
    }
    const customer = yield Customers_1.default.findOne({ name: name });
    res.status(200).json({ success: true, data: customer });
}));
exports.searchCustomer = searchCustomer;
const updateCustomer = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _customer = yield Customers_1.default.findById(req.params.id);
    if (!_customer) {
        next(new ErrorMessage_1.default(`No customer with that id ${req.params.id} was found`, 404));
    }
    const customer = yield Customers_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
    console.log("customer");
    res.status(200).json({ success: true, data: customer });
}));
exports.updateCustomer = updateCustomer;
const deleteCustomer = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.params.id;
    if (!customerId) {
        return next(new ErrorMessage_1.default(`No customer with id ${customerId} found`, 404));
    }
    // Find and delete the customer by ID
    const customer = yield Customers_1.default.findByIdAndDelete(customerId);
    res.status(200).json({ success: true, data: customer });
}));
exports.deleteCustomer = deleteCustomer;
