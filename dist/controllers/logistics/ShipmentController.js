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
exports.updateInternationalShipment = exports.updateInterStateShipment = exports.createInterstateShipment = exports.getInterstateShipment = exports.getInterstateShipments = exports.createInternationalShipment = exports.getInternationalShipment = exports.getInternationalShipments = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Shipments_1 = __importDefault(require("../../models/logistics/Shipments"));
const ErrorMessage_1 = __importDefault(require("../../messages/ErrorMessage"));
const index_1 = require("../../constants/index");
const createInternationalShipment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shipping_type, zone, countries, kg } = req.body;
    if (!shipping_type || !zone) {
        return next(new ErrorMessage_1.default(`Please Provide Shipping type and Zone`, 400));
    }
    if (!kg || !kg.weight || !kg.price) {
        return next(new ErrorMessage_1.default(`Please Provide KG Weight and Price`, 400));
    }
    if (!countries || countries.length === 0) {
        return next(new ErrorMessage_1.default(`Please Provide atleast one country`, 400));
    }
    const countriesList = countries.split(",");
    const shipmentData = {
        type: "international",
        shipping_type,
        zone,
        countries,
        kg
    };
    const shipment = yield Shipments_1.default.create(shipmentData);
    res.status(201).json({ success: true, data: shipment });
}));
exports.createInternationalShipment = createInternationalShipment;
const getInternationalShipments = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shipment = yield Shipments_1.default.find({ type: index_1.SHIPMENT_TYPES.INTERNATIONAL }).limit(10);
    res.status(201).json({ success: true, data: shipment });
}));
exports.getInternationalShipments = getInternationalShipments;
const updateInternationalShipment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shipmentId } = req.params;
    const shipment = yield Shipments_1.default.findOneAndUpdate({ _id: shipmentId }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(201).json({ success: true, updated: true, data: shipment });
}));
exports.updateInternationalShipment = updateInternationalShipment;
const getInternationalShipment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shipment = yield Shipments_1.default.findById({ _id: req.params.id });
    if (!req.params.id || shipment) {
        return next(new ErrorMessage_1.default(`Please Provide a valid ID - ${req.params.id} not found`, 404));
    }
    const _shipment = yield Shipments_1.default.findOne({ type: index_1.SHIPMENT_TYPES.INTERNATIONAL });
    res.status(201).json({ success: true, data: _shipment });
}));
exports.getInternationalShipment = getInternationalShipment;
// Interstate Shipmemt
const createInterstateShipment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shipping_type, zone, countries, kg } = req.body;
    if (!shipping_type || !zone) {
        return next(new ErrorMessage_1.default(`Please Provide Shipping type and Zone`, 400));
    }
    if (!kg || !kg.weight || !kg.price) {
        return next(new ErrorMessage_1.default(`Please Provide KG Weight and Price`, 400));
    }
    if (!countries || countries.length === 0) {
        return next(new ErrorMessage_1.default(`Please Provide atleast one country`, 400));
    }
    const countriesList = countries.split(",").trim();
    const shipmentData = {
        type: "interstate",
        shipping_type,
        zone,
        countries,
        kg
    };
    const shipment = yield Shipments_1.default.create(shipmentData);
    res.status(201).json({ success: true, data: shipment });
}));
exports.createInterstateShipment = createInterstateShipment;
const getInterstateShipments = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shipment = yield Shipments_1.default.find({ type: index_1.SHIPMENT_TYPES.INTERSTATE }).limit(10);
    res.status(201).json({ success: true, data: shipment });
}));
exports.getInterstateShipments = getInterstateShipments;
const getInterstateShipment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return next(new ErrorMessage_1.default(`Please Provide a valid ID - ${req.params.id} not founc`, 404));
    }
    const shipment = yield Shipments_1.default.findOne({ type: index_1.SHIPMENT_TYPES.INTERSTATE });
    res.status(201).json({ success: true, data: shipment });
}));
exports.getInterstateShipment = getInterstateShipment;
const updateInterStateShipment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shipmentId } = req.params;
    const shipment = yield Shipments_1.default.findOneAndUpdate({ _id: shipmentId }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(201).json({ success: true, data: shipment });
}));
exports.updateInterStateShipment = updateInterStateShipment;
