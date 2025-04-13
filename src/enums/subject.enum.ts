import { z } from "zod";

export const subject = z.enum([
    "IT",
    "ELECTRICALS",
    "MATHEMATICS",
    "PHYSICS",
])
