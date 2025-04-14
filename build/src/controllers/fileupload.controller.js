"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteQuestion = exports.updateQuestion = exports.getQuestionsById = exports.getQuestions = exports.uploadQuestion = void 0;
const fileUploadService = __importStar(require("../services/fileUpload.service"));
const http_status_1 = require("../utils/http-status");
const catchAsync_1 = require("../utils/catchAsync");
exports.uploadQuestion = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const imagePaths = files.map(file => file.path);
    const data = Object.assign(Object.assign({}, req.body), { file: imagePaths, year: req.body.year });
    const upload = yield fileUploadService.uploadQuestion(data);
    res.status(http_status_1.HttpStatus.CREATED).json({ upload });
}));
exports.getQuestions = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield fileUploadService.getAllQuestions();
    res.status(http_status_1.HttpStatus.CREATED).json({ questions });
}));
exports.getQuestionsById = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const questions = yield fileUploadService.fetchQuestion(id);
    res.status(http_status_1.HttpStatus.CREATED).json({ questions });
}));
exports.updateQuestion = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const { id } = req.params;
    const questions = yield fileUploadService.updateQuestion(id, data);
    res.status(http_status_1.HttpStatus.CREATED).json({ questions });
}));
exports.deleteQuestion = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const question = yield fileUploadService.deleteQuestion(id);
    res.status(http_status_1.HttpStatus.CREATED).json({ question });
}));
