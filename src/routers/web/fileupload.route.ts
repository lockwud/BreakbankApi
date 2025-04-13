import { validatePayload } from './../../middlewares/validate-payload';
import { Router } from "express";
import * as file from "../../controllers/fileupload.controller"
import upload from '../../utils/multer';
const uploadRoute = Router();


uploadRoute.post("/", 
    upload.array("file"),
    validatePayload('fileUpload'),
    file.uploadQuestion
);

uploadRoute.get("/", 
    file.getQuestions
);

uploadRoute.patch("/:id",
    file.updateQuestion
);

uploadRoute.delete("/:id",
    file.deleteQuestion
);

uploadRoute.get("/:id",
    file.getQuestionsById
)

export default uploadRoute