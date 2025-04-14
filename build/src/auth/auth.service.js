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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = require("../utils/bcrypt");
const auth_validator_1 = require("../validators/auth.validator");
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
const errorHandler_1 = require("../middlewares/errorHandler");
const http_error_1 = __importDefault(require("../utils/http-error"));
const signup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validatesignupData = auth_validator_1.signupSchema.safeParse(data);
    if (!validatesignupData.success) {
        const errors = validatesignupData.error.issues.map(({ message, path }) => `${path}: ${message}`);
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    else {
        const hashedPassword = yield (0, bcrypt_1.hash)(data.password);
        const findUser = yield prisma_1.default.user.findUnique({
            where: {
                studentId: data.studentId
            }
        });
        if (findUser) {
            throw new http_error_1.default(http_status_1.HttpStatus.CONFLICT, "Student ID already exist");
        }
        const user = yield prisma_1.default.user.create({
            data: {
                fullname: data.fullname,
                studentId: data.studentId,
                password: hashedPassword,
            }
        });
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        // Extract user ID and email to create the payload for the token
        const payload = {
            id: user.id,
            studentId: user.studentId,
        };
        // Generate the token using signToken function
        const token = (0, jsonwebtoken_1.signToken)(payload);
        return {
            userWithoutPassword,
            token
        };
    }
});
exports.signup = signup;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validatesignupData = auth_validator_1.loginSchema.safeParse(data);
    if (!validatesignupData.success) {
        const errors = validatesignupData.error.issues.map(({ message, path }) => `${path}: ${message}`);
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    else {
        const findUser = yield prisma_1.default.user.findUnique({
            where: {
                studentId: data.studentId
            }
        });
        if (!findUser) {
            throw new http_error_1.default(http_status_1.HttpStatus.NOT_FOUND, "User not found");
        }
        const verifiedPassword = yield (0, bcrypt_1.compare)(data.password, findUser.password);
        if (!verifiedPassword) {
            throw new http_error_1.default(http_status_1.HttpStatus.UNAUTHORIZED, "Invalid password");
        }
        const { password } = findUser, userWithoutPassword = __rest(findUser, ["password"]);
        const token = (0, jsonwebtoken_1.signToken)({ id: findUser.id, studentId: findUser.studentId });
        yield prisma_1.default.user.update({
            where: {
                id: findUser.id
            },
            data: {
                token: token
            }
        });
        return {
            userWithoutPassword
        };
    }
});
exports.login = login;
