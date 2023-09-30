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
exports.getUserById = exports.getUserByEmail = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const ErrorMessage_1 = __importDefault(require("../messages/ErrorMessage"));
const getUserByEmail = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    console.log("email", email);
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return next(new ErrorMessage_1.default(`No User with that email was found`, 404));
    }
    res.status(200).json({ success: true, data: user });
}));
exports.getUserByEmail = getUserByEmail;
const getUserById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield User_1.default.findOne({ _id: userId });
    if (!userId) {
        return next(new ErrorMessage_1.default(`No User was found`, 404));
    }
    res.status(200).json({ success: true, data: user });
}));
exports.getUserById = getUserById;
