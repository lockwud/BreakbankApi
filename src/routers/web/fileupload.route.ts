import { validatePayload } from './../../middlewares/validate-payload';
import { Router } from "express";
import * as file from "../../controllers/fileupload.controller"
import upload from '../../utils/multer';
const uploadRoute = Router();

// Upload a new question
uploadRoute.post("/", 
    upload.array("file"),
    validatePayload('fileUpload'),
    file.uploadQuestion
);

// Get all questions
uploadRoute.get("/", 
    file.getQuestions
);

// Update a question by ID
uploadRoute.patch("/:id",
    file.updateQuestion
);

// Delete a question by ID
uploadRoute.delete("/:id",
    file.deleteQuestion
);

// Get a question by ID
uploadRoute.get("/:id",
    file.getQuestionsById
);

// Download a file by ID
uploadRoute.get("/download/:id", 
    file.downloadFileById
);

export default uploadRoute