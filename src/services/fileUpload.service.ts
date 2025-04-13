import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import { throwError } from "../middlewares/errorHandler";
import HttpException from "../utils/http-error";
import { fileDto, fileUploadSchema } from "../validators/upload.validator";

export const uploadQuestion = async(data: fileDto) =>{
    const validateForms = fileUploadSchema.safeParse(data);
    if(!validateForms.success) {
        const errors = validateForms.error.issues.map(
            ({
                message, path
            })=> `${path}: ${message}`
        )
        throwError(HttpStatus.BAD_REQUEST, errors.join(". "))
    }else{
        const upload = await prisma.fileUpload.create({
            data: {
                title: data.title,
                year: new Date(data.year),
                file: data.file,
                examType: data.examType,
            }
        })
        return upload
    }
}

export const getAllQuestions = async() =>{
    const uploads = await prisma.fileUpload.findMany()
    return uploads;
}