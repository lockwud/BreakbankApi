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
exports.getDownloadUrl = exports.deleteQuestion = exports.updateQuestion = exports.fetchQuestion = exports.getAllQuestions = exports.uploadQuestion = void 0;
const http_status_1 = require("../utils/http-status");
const prisma_1 = __importDefault(require("../utils/prisma"));
const errorHandler_1 = require("../middlewares/errorHandler");
const upload_validator_1 = require("../validators/upload.validator");
const uploadQuestion = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validateForms = upload_validator_1.fileUploadSchema.safeParse(data);
    if (!validateForms.success) {
        const errors = validateForms.error.issues.map(({ message, path }) => `${path}: ${message}`);
        (0, errorHandler_1.throwError)(http_status_1.HttpStatus.BAD_REQUEST, errors.join(". "));
    }
    else {
        const upload = yield prisma_1.default.fileUpload.create({
            data: {
                title: data.title,
                year: new Date(data.year),
                description: data.description,
                course: data.course,
                file: data.file,
                examType: data.examType,
            }
        });
        return upload;
    }
});
exports.uploadQuestion = uploadQuestion;
const getAllQuestions = () => __awaiter(void 0, void 0, void 0, function* () {
    const uploads = yield prisma_1.default.fileUpload.findMany();
    return uploads;
});
exports.getAllQuestions = getAllQuestions;
const fetchQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const upload = yield prisma_1.default.fileUpload.findUnique({
        where: {
            id: id,
        }
    });
    return upload;
});
exports.fetchQuestion = fetchQuestion;
const updateQuestion = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield prisma_1.default.fileUpload.update({
        where: {
            id: id,
        },
        data
    });
    return update;
});
exports.updateQuestion = updateQuestion;
const deleteQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield prisma_1.default.fileUpload.delete({
        where: {
            id: id,
        },
    });
    return deleted;
});
exports.deleteQuestion = deleteQuestion;
const getDownloadUrl = (id, index) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield prisma_1.default.fileUpload.findUnique({
        where: { id },
    });
    if (!question || !question.file || question.file.length === 0) {
        throw new Error("No files found for this question");
    }
    if (index < 0 || index >= question.file.length) {
        throw new Error("Invalid file index");
    }
    const originalUrl = question.file[index];
    const downloadUrl = originalUrl.replace("/upload/", "/upload/fl_attachment/");
    return downloadUrl;
});
exports.getDownloadUrl = getDownloadUrl;
