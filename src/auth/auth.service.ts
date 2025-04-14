import { HttpStatus } from "../utils/http-status";
import prisma from "../utils/prisma";
import {hash, compare} from "../utils/bcrypt"
import { loginDto, loginSchema, signupDto, signupSchema } from "../validators/auth.validator";
import { signToken, UserPayload } from "../utils/jsonwebtoken";
import { throwError } from "../middlewares/errorHandler";
import { checkMobileNetwork, phoneValidator } from "../utils/phone.check";
import HttpException from "../utils/http-error";
import Cookies from "js-cookie";

export const signup = async(data: signupDto) => {
    const validatesignupData = signupSchema.safeParse(data);
    if(!validatesignupData.success) {
        const errors = validatesignupData.error.issues.map(
            ({
                message, path
            })=> `${path}: ${message}`
        )
        throwError(HttpStatus.BAD_REQUEST, errors.join(". "))
    }else{
        const hashedPassword = await hash(data.password)
        const findUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (findUser){
            throw new HttpException(HttpStatus.CONFLICT, "Email already exist")
        }
        const user = await prisma.user.create({
            data: {
                fullname: data.fullname,
                email: data.email,
                password: hashedPassword,
            }
        })
        const { password, ...userWithoutPassword } = user;
         // Extract user ID and email to create the payload for the token
         const payload = {
            id: user.id,
            email: user.email,
        };

        // Generate the token using signToken function
        const token = signToken(payload);
        return {
            userWithoutPassword, 
            token
        }
    }
}

export const login = async(data: loginDto) => {
    const validatesignupData = loginSchema.safeParse(data);
    if(!validatesignupData.success) {
        const errors = validatesignupData.error.issues.map(
            ({
                message, path
            })=> `${path}: ${message}`
        )
        throwError(HttpStatus.BAD_REQUEST, errors.join(". "))
    }else{
        const findUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if(!findUser) {
            throw new HttpException(HttpStatus.NOT_FOUND, "User not found")
        }
        const verifiedPassword = await compare(data.password, findUser.password)
        if(!verifiedPassword) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid password")
        }
        const {password, ...userWithoutPassword} = findUser
        const token = signToken({id: findUser.id, email: findUser.email})
         await prisma.user.update({
            where:{
                id: findUser.id
            },
            data:{
                token: token

            }
         })
        return {
            userWithoutPassword
        };
    }
}

