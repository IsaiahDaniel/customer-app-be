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
exports.verifyKyc = exports.getKyc = exports.getKycs = exports.createKyc = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ErrorMessage_1 = __importDefault(require("../messages/ErrorMessage"));
const kyc_1 = __importDefault(require("../models/kyc"));
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const User_1 = __importDefault(require("../models/User"));
const createKyc = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bvn, passport } = req.body;
    if (!bvn || !passport) {
        return next(new ErrorMessage_1.default("BVN and Passport is required", 400));
    }
    utils_1.cloudinary.uploader.upload(req.file.path, function (err, result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return next(new ErrorMessage_1.default(`File Upload Error`, 400));
            }
            const kycData = {
                bvn: req.body.bvn,
                passport: req.body.passport,
                status: constants_1.ITEM_STATUS.PENDING
            };
            const kyc = yield kyc_1.default.create(kycData);
            res.status(200).json({
                success: true,
                message: "Uploaded!",
                data: kyc,
            });
        });
    });
}));
exports.createKyc = createKyc;
const getKycs = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.query;
    const kycs = yield kyc_1.default.find({ status: status }).populate("user");
    res.json({ success: true, data: kycs });
}));
exports.getKycs = getKycs;
const getKyc = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const kycs = yield kyc_1.default.findOne({ _id: id }).populate("user").select("-password");
    res.json({ success: true, data: kycs });
}));
exports.getKyc = getKyc;
// @route   PATCH /api/v1/kyc/:id
// @desc    update status of a kyc
// @access  Public
const verifyKyc = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userId } = req.params;
    const { status } = req.query;
    const kyc = yield kyc_1.default.findOneAndUpdate({ _id: id }, { status: status, verifiedBy: req.user.id }, {
        new: true
    }).populate("user").select("-password");
    if (kyc) {
        yield User_1.default.findOneAndUpdate({ _id: userId }, { kycVerified: true });
    }
    console.log("verified kyc", kyc);
    res.json({ success: true, data: kyc });
}));
exports.verifyKyc = verifyKyc;
