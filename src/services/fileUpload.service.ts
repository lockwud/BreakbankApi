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
                description: data.description,
                subject: data.subject,
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

export const fetchQuestion = async(id: string) =>{
    const upload = await prisma.fileUpload.findUnique({
        where: {
            id: id,
        }
    })
    return upload;
}

export const updateQuestion = async(id: string, data: Partial<fileDto>) =>{
    const update = await prisma.fileUpload.update({
        where: {
            id: id,
        },
        data
    })
    return update;
}

export const deleteQuestion = async(id: string) =>{
    const deleted = await prisma.fileUpload.delete({
        where: {
            id: id,
        },
    })
    return deleted;
}