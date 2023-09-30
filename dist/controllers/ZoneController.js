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
exports.deleteZoneInterstate = exports.updateZoneInterstate = exports.getZoneInterstate = exports.deleteZoneInternational = exports.updateZoneInternational = exports.getZoneInternational = exports.createZone = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Zone_1 = __importDefault(require("../models/Zone"));
const constants_1 = require("../constants");
const ErrorMessage_1 = __importDefault(require("../messages/ErrorMessage"));
const createZone = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const zoneData = {
        user: req.user.id,
        zone: req.body.zone,
        shipping_type: req.body.shipping_type,
    };
    const zone = yield Zone_1.default.create(zoneData);
    res.status(201).json({ success: true, data: zone });
}));
exports.createZone = createZone;
const getZoneInternational = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const internationalZones = yield Zone_1.default.find({ shipping_type: constants_1.SHIPMENT_TYPES.INTERNATIONAL });
    res.status(200).json({ success: true, data: internationalZones });
}));
exports.getZoneInternational = getZoneInternational;
const updateZoneInternational = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const internationalZone = yield Zone_1.default.findById(req.params.id);
    // if(!internationalZone){
    //     next(new ErrorResponse(``, 404))
    // }
    const internationalZones = yield Zone_1.default.find({ shipping_type: constants_1.SHIPMENT_TYPES.INTERSTATE });
    res.status(200).json({ success: true, data: internationalZones });
}));
exports.updateZoneInternational = updateZoneInternational;
const deleteZoneInternational = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const zone = yield Zone_1.default.findById({ _id: req.params.id });
    if (!zone) {
        return next(new ErrorMessage_1.default(`No Zone with the ID ${req.params.id} was found`, 404));
    }
    yield zone.remove();
    res.status(200).json({ success: true, data: zone });
}));
exports.deleteZoneInternational = deleteZoneInternational;
const getZoneInterstate = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const interstateZones = yield Zone_1.default.find({ shipping_type: constants_1.SHIPMENT_TYPES.INTERSTATE });
    res.status(200).json({ success: true, data: interstateZones });
}));
exports.getZoneInterstate = getZoneInterstate;
const updateZoneInterstate = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.updateZoneInterstate = updateZoneInterstate;
const deleteZoneInterstate = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const zone = yield Zone_1.default.findById({ _id: req.params.id });
    if (!zone) {
        return next(new ErrorMessage_1.default(`No Zone with the ID ${req.params.id} was found`, 404));
    }
    yield zone.remove();
    res.status(200).json({ success: true, data: zone });
}));
exports.deleteZoneInterstate = deleteZoneInterstate;
