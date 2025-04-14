"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examType = void 0;
const zod_1 = require("zod");
exports.examType = zod_1.z.enum([
    "midsem",
    "final",
    "quiz",
    "other",
    "assignment",
    "practicequestions",
    "national",
    "entrance",
]);
