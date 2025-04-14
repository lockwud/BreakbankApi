import { z } from "zod";

export const course = z.enum([
    "IT",
    "ELECTRICALS",
    "MATHEMATICS",
    "PHYSICS",
])
