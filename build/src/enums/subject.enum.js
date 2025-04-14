"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.course = void 0;
const zod_1 = require("zod");
exports.course = zod_1.z.enum([
    "IT",
    "ELECTRICALS",
    "MATHEMATICS",
    "PHYSICS",
]);
