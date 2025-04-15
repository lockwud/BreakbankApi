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
                course: data.course,
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

export const getDownloadUrl = async (id: string, index: number): Promise<string> => {
    const question = await prisma.fileUpload.findUnique({
      where: { id },
    });
  
    if (!question || !question.file || question.file.length === 0) {
      throw new Error("No files found for this question");
    }
  
    if (index < 0 || index >= question.file.length) {
      throw new Error("Invalid file index");
    }
  
    const originalUrl = question.file[index];
    const downloadUrl = originalUrl.replace("/upload/", "/upload/fl_attachment/");
    return downloadUrl;
  };