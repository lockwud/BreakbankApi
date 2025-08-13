import { z } from "zod"

const studentIdSchema = z
  .string()
  .length(10, { message: 'Student ID must be exactly 10 digits long' })
  .regex(/^\d+$/, { message: 'Student ID must contain only digits' })
  .refine((val) => {
    const prefix = val.slice(0, 7);
    const suffix = parseInt(val.slice(7), 10);
    return prefix === '5221040' && suffix >= 1 && suffix <= 900;
  }, {
    message: 'Invalid Student ID',
  });

export const signupSchema = z.object({
    fullname: z.string({required_error: "First name cannot be empty"})
   .trim()
   .min(1, "First name is required"),
    studentId: studentIdSchema,
    password: z.string({required_error: "Password is required"}).min(6, "too small"),
    token: z.string().optional(),
});

export type signupDto = z.infer<typeof signupSchema>


export const loginSchema = z.object({
    studentId: z.string({required_error:"Student ID is required"}),
    password: z.string({required_error: "Password is required"})
})

export type loginDto = z.infer<typeof loginSchema>
