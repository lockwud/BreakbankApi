"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadSchema = void 0;
const zod_1 = require("zod");
const examtype_enum_1 = require("../enums/examtype.enum");
const subject_enum_1 = require("../enums/subject.enum");
exports.fileUploadSchema = zod_1.z.object({
    title: zod_1.z.string(),
    year: zod_1.z.preprocess((arg) => {
        if (typeof arg === "string") {
            const parsedDate = new Date(arg);
            console.log("Preprocessed Date:", arg);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
        }
        return arg;
    }, zod_1.z.date({
        required_error: "Please provide a valid date",
    })
        .min(new Date(2016, 0, 1), "Date cannot be before January 1, 2016")
        .max(new Date(), "Date cannot be in the future")),
    description: zod_1.z.string().optional(),
    course: subject_enum_1.course,
    file: zod_1.z.array(zod_1.z.string()),
    examType: examtype_enum_1.examType,
});
