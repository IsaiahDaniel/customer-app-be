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
exports.getHaulages = exports.getHaulage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Haulage_1 = __importDefault(require("../../models/logistics/Haulage"));
const getHaulages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const haulage = yield Haulage_1.default.find();
    res.status(200).json({ success: true, data: haulage });
}));
exports.getHaulages = getHaulages;
const getHaulage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const haulage = yield Haulage_1.default.findOne({ user: req.user.id, _id: req.params.id });
    res.status(200).json({ success: true, data: haulage });
}));
exports.getHaulage = getHaulage;
