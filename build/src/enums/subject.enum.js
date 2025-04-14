"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subject = void 0;
const zod_1 = require("zod");
exports.subject = zod_1.z.enum([
    "IT",
    "ELECTRICALS",
    "MATHEMATICS",
    "PHYSICS",
]);
