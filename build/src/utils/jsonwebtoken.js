"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInvalidToken = exports.signToken = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_error_1 = __importDefault(require("./http-error"));
const http_status_1 = require("./http-status");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token) {
        return next(new http_error_1.default(http_status_1.HttpStatus.FORBIDDEN, "No token found"));
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new http_error_1.default(http_status_1.HttpStatus.FORBIDDEN, "Invalid token"));
        }
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
// Function to sign a JWT token with the user payload
const signToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    if (!secret || !expiresIn) {
        throw new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "JWT configuration is missing");
    }
    // Ensure the secret and expiresIn are the correct types.
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: expiresIn, // Add type assertion here
    });
};
exports.signToken = signToken;
// Function to create a short-lived invalid token
const setInvalidToken = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new http_error_1.default(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, "JWT secret is missing");
    }
    // Ensure the secret is the correct type.
    return jsonwebtoken_1.default.sign({ logout: "logout" }, secret, {
        expiresIn: "1h", // Short-lived token with correct format
    });
};
exports.setInvalidToken = setInvalidToken;
