import { validatePayload } from './../../middlewares/validate-payload';
import { Router } from "express";
import * as file from "../../controllers/fileupload.controller"
import {authenticateJWT} from "../../utils/jsonwebtoken"
const uploadRoute = Router();


uploadRoute.post("/", 
    file.uploadQuestion
);

uploadRoute.get("/", 
    file.getQuestions
);

export default uploadRoute