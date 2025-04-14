import { Request, Response, NextFunction } from "express";
import * as userService from "../auth/auth.service"
import { HttpStatus } from "../utils/http-status";
import { catchAsync } from '../utils/catchAsync';
import { signupDto, loginDto } from "../validators/auth.validator";

export const signUp = catchAsync(
    async(req: Request, res: Response, next: NextFunction
        
    )=>{
        const data = req.body satisfies signupDto
        const user = await userService.signup(data)
        res.status(HttpStatus.CREATED).json({user})
});

export const login = catchAsync(
    async(req: Request, res: Response, next: NextFunction
        
    )=>{
        const data = req.body satisfies loginDto
        const user = await userService.login(data)
        res.status(HttpStatus.OK).json({user})
});


