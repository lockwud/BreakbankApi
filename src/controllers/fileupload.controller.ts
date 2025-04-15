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


export const getQuestionsById = catchAsync(
    async(req: Request, res: Response, next: NextFunction
        
    )=>{
        const { id }  = req.params
        const questions = await fileUploadService.fetchQuestion(id);
        res.status(HttpStatus.CREATED).json({questions})
});


export const updateQuestion = catchAsync(
    async(req: Request, res: Response, next: NextFunction
        
    )=>{
        const {data}  = req.body
        const { id }  = req.params
        const questions = await fileUploadService.updateQuestion(id, data);
        res.status(HttpStatus.CREATED).json({questions})
});


export const deleteQuestion = catchAsync(
    async(req: Request, res: Response, next: NextFunction
        
    )=>{
        const { id }  = req.params
        const question = await fileUploadService.deleteQuestion(id);
        res.status(HttpStatus.CREATED).json({question})
});



export const downloadFileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = parseInt(req.query.index as string || '0');

    const url = await fileUploadService.getDownloadUrlById(id, index);

    if (!url) {
      return res.status(404).json({ message: 'File not found' });
    }

    return res.json({ url });
  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
