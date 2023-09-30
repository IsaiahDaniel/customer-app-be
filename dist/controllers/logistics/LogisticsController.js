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
exports.updateInterStateShipment = exports.getInterstateShipmentsFilter = exports.getInterStateShipments = exports.CreateInterStateShipment = exports.getInternationalShipmentsFilter = exports.getInternationalShipmentByStatus = exports.getInternationalShipments = exports.getInternationalShipment = exports.updateInternationalShipment = exports.CreateInternationalShipment = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const InternationalShipment_1 = __importDefault(require("../../models/logistics/InternationalShipment"));
const ErrorMessage_1 = __importDefault(require("../../messages/ErrorMessage"));
const CreateInternationalShipment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = yield InternationalShipment_1.default.validate(req.body);
    const shippingData = Object.assign(Object.assign({}, req.body), { user: req.user.id });
    const shipment = yield InternationalShipment_1.default.create(shippingData);
    res.status(200).json({
        success: true,
        data: shipment,
    });
}));
exports.CreateInternationalShipment = CreateInternationalShipment;
const getInternationalShipmentByStatus = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req", req.query);
    const shipment = yield InternationalShipment_1.default.findById({ _id: req.params.id });
    if (!req.params.id || shipment) {
        return next(new ErrorMessage_1.default(`Please Provide a valid ID - ${req.params.id} not found`, 404));
    }
    const _shipment = yield InternationalShipment_1.default.find({ status: req.query.status });
    res.status(201).json({ success: true, data: _shipment });
}));
exports.getInternationalShipmentByStatus = getInternationalShipmentByStatus;
const updateInternationalShipment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shipmentId } = req.params;
    const shipment = yield InternationalShipment_1.default.findOneAndUpdate({ _id: shipmentId }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(201).json({ success: true, data: shipment });
}));
exports.updateInternationalShipment = updateInternationalShipment;
const CreateInterStateShipment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = yield InternationalShipment_1.default.validate(req.body);
    const shipment = yield InternationalShipment_1.default.create(req.body);
    res.status(200).json({
        success: true,
        data: shipment,
    });
}));
exports.CreateInterStateShipment = CreateInterStateShipment;
const getInternationalShipments = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shipments = yield InternationalShipment_1.default.find().limit(10);
    res.json({ success: true, data: shipments });
}));
exports.getInternationalShipments = getInternationalShipments;
const getInternationalShipment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return next(new ErrorMessage_1.default(`No Tracking ID for ${req.params.id}`, 400));
    }
    const shipments = yield InternationalShipment_1.default.findOne({
        orderId: req.params.id,
    });
    res.json({ success: true, data: shipments });
}));
exports.getInternationalShipment = getInternationalShipment;
const getInternationalShipmentsFilter = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.query", req.query);
    const { status } = req.query;
    if (!status) {
        return next(new ErrorMessage_1.default('No valid status values provided', 400));
    }
    const shipments = yield InternationalShipment_1.default.find({
        status: status
    });
    res.json({ success: true, data: shipments });
}));
exports.getInternationalShipmentsFilter = getInternationalShipmentsFilter;
const getInterstateShipmentsFilter = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.query", req.query);
    const { status } = req.query;
    if (!status) {
        return next(new ErrorMessage_1.default('No valid status values provided', 400));
    }
    const shipments = yield InternationalShipment_1.default.find({
        status: status
    });
    res.json({ success: true, data: shipments });
}));
exports.getInterstateShipmentsFilter = getInterstateShipmentsFilter;
const getInterStateShipments = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shipments = yield InternationalShipment_1.default.find({ orderId: req.user.id });
    res.json({ success: true, data: shipments });
}));
exports.getInterStateShipments = getInterStateShipments;
const updateInterStateShipment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shipments = yield InternationalShipment_1.default.find({ orderId: req.user.id });
    res.json({ success: true, data: shipments });
}));
exports.updateInterStateShipment = updateInterStateShipment;
