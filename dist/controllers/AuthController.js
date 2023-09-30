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
exports.registerUser = exports.loginUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ErrorMessage_1 = __importDefault(require("../messages/ErrorMessage"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
const User_1 = __importDefault(require("../models/User"));
const loginUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return next(new ErrorMessage_1.default(`Invalid Credentials`, 404));
    }
    if (!email || !password) {
        return next(new ErrorMessage_1.default(`Please Provide Valid Credentials`, 404));
    }
    const passwordMatch = yield user.matchPassword(password);
    if (!passwordMatch) {
        return next(new ErrorMessage_1.default(`Invalid Credentials`, 404));
    }
    const token = (0, TokenService_1.default)(user._id);
    res.status(201).json({ success: true, data: user, token });
}));
exports.loginUser = loginUser;
const registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, phone } = req.body;
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        return next(new ErrorMessage_1.default("Please try a different Email.", 400));
    }
    const user = yield User_1.default.create({
        email,
        username,
        password,
        phone
    });
    const token = (0, TokenService_1.default)(user === null || user === void 0 ? void 0 : user._id);
    res.status(201).json({ success: true, data: user, token });
}));
exports.registerUser = registerUser;
