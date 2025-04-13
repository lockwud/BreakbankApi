import { z } from "zod";

export const examType = z.enum([
    "midsem",
    "final",
    "quiz",
   "other",
    "assignment",
    "practicequestions",
    "national",
    "entrance",
])