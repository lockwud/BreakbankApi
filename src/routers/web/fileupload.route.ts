import { validatePayload } from './../../middlewares/validate-payload';
import { Router } from "express";
import * as file from "../../controllers/fileupload.controller"
import {authenticateJWT} from "../../utils/jsonwebtoken"
const uploadRoute = Router();


uploadRoute.post("/", 
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