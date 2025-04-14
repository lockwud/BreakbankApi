"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
const studentIdSchema = zod_1.z
    .string()
    .length(10, { message: 'Student ID must be exactly 10 digits long' })
    .regex(/^\d+$/, { message: 'Student ID must contain only digits' })
    .refine((val) => {
    const prefix = val.slice(0, 7);
    const suffix = parseInt(val.slice(7), 10);
    return prefix === '5221040' && suffix >= 1 && suffix <= 300;
}, {
    message: 'Invalid Student ID',
});
exports.signupSchema = zod_1.z.object({
    fullname: zod_1.z.string({ required_error: "First name cannot be empty" })
        .trim()
        .min(1, "First name is required"),
    studentId: studentIdSchema,
    password: zod_1.z.string({ required_error: "Password is required" }).min(6, "too small"),
    token: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    studentId: zod_1.z.string({ required_error: "Student ID is required" }),
    password: zod_1.z.string({ required_error: "Password is required" })
});
