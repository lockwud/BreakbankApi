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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMobileNetwork = exports.phoneValidator = void 0;
const http_status_1 = require("./http-status");
const errorHandler_1 = require("../middlewares/errorHandler");
// Phone Validator Function
const phoneValidator = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const prefix = "+233";
    switch (true) {
        case phone.startsWith(prefix + "0"):
            return "0" + phone.slice(5);
        case phone.startsWith(prefix):
            return "0" + phone.slice(4);
        case /^0\d{9}$/.test(phone):
            return phone;
        default:
            (0, errorHandler_1.throwError)(http_status_1.HttpStatus.BAD_REQUEST, "Invalid phone number format");
    }
});
exports.phoneValidator = phoneValidator;
// Check Mobile Network Function
const checkMobileNetwork = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const Mtn = ["024", "025", "054", "055", "053", "059"];
    const AirtelTigo = ["027", "057", "026"];
    const Telecel = ["020", "050"];
    // Extract the local network prefix (first 3 digits)
    let phonePrefix = phone.slice(0, 3);
    if (Mtn.includes(phonePrefix) || AirtelTigo.includes(phonePrefix) || Telecel.includes(phonePrefix)) {
        return phone;
    }
    else {
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.FORBIDDEN, "Phone number not supported");
    }
});
exports.checkMobileNetwork = checkMobileNetwork;
