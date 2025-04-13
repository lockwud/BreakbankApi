"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    fullname: zod_1.z.string({ required_error: "First name cannot be empty" })
        .trim()
        .min(1, "First name is required"),
    email: zod_1.z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    password: zod_1.z.string({ required_error: "Password is required" }).min(6, "too small"),
    token: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    password: zod_1.z.string({ required_error: "Password is required" })
});
