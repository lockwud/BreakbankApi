import { z } from "zod"

export const signupSchema = z.object({
    fullname: z.string({required_error: "First name cannot be empty"})
   .trim()
   .min(1, "First name is required"),
    email: z.string({required_error:"Email is required"}).email({message: "Invalid email address"}),
    password: z.string({required_error: "Password is required"}).min(6, "too small"),
    token: z.string().optional(),
});

export type signupDto = z.infer<typeof signupSchema>


export const loginSchema = z.object({
    email: z.string({required_error:"Email is required"}).email({message: "Invalid email address"}),
    password: z.string({required_error: "Password is required"})
})

export type loginDto = z.infer<typeof loginSchema>