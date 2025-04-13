import { getAllQuestions } from './../services/fileUpload.service';
import { Request, Response, NextFunction } from "express";
import * as fileUploadService from "../services/fileUpload.service"
import { HttpStatus } from "../utils/http-status";
import { catchAsync } from '../utils/catchAsync';
import { fileDto } from "../validators/upload.validator";
export const uploadQuestion = catchAsync(
    async (req: Request, res: Response, next: NextFunction) =>{
    const files = req.files as Express.Multer.File[];
    const imagePaths = files.map(file => file.path);
    const data:  fileDto = {
        ...req.body,
        file: imagePaths,
        year: req.body.year
    };
    const upload = await fileUploadService.uploadQuestion(data);
    res.status(HttpStatus.CREATED).json({upload})   
    }
);

export const getQuestions = catchAsync(
    async(req: Request, res: Response, next: NextFunction
        
    )=>{
        const questions = await fileUploadService.getAllQuestions();
        res.status(HttpStatus.CREATED).json({questions})
});