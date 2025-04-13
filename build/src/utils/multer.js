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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("./cloudinary")); // Assuming this is your cloudinary config file
// Set up Cloudinary storage
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        return {
            folder: "pastQuestions",
            allowed_formats: ["jpg", "jpeg", "png", "pdf", "mp4", "mp3", "xls", "xlsx", "ppt", "pptx", "doc", "docx"],
            resource_type: ext === ".mp4" || ext === ".mp3" ? "video" : "auto", // auto-detects file type
            public_id: `${Date.now()}-${file.originalname}`,
        };
    }),
});
// File filter
const fileFilter = (req, file, cb) => {
    const allowedExt = [
        ".jpg",
        ".jpeg",
        ".png",
        ".pdf",
        ".mp4",
        ".mp3",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".doc",
        ".docx",
    ];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    if (!allowedExt.includes(ext)) {
        cb(new Error("File type is not supported"), false);
        return;
    }
    cb(null, true);
};
// Multer config using Cloudinary storage
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.default = upload;
