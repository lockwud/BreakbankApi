import multer from "multer";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary"; // Assuming this is your cloudinary config file

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: any, file: { originalname: string; }) => {
    const ext = path.extname(file.originalname).toLowerCase();

    return {
      folder: "pastQuestions",
      allowed_formats: ["jpg", "jpeg", "png", "pdf", "mp4", "mp3", "xls", "xlsx", "ppt", "pptx", "doc", "docx"],
      resource_type: ext === ".mp4" || ext === ".mp3" ? "video" : "auto", // auto-detects file type
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

// File filter
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: Function) => {
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

  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExt.includes(ext)) {
    cb(new Error("File type is not supported"), false);
    return;
  }

  cb(null, true);
};

// Multer config using Cloudinary storage
const upload = multer({ storage, fileFilter });

export default upload;
