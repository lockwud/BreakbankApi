import { z } from "zod"
import { examType } from "../enums/examtype.enum"
import { subject } from "../enums/subject.enum";

export const fileUploadSchema = z.object({
    title: z.string(),
    year: z.preprocess(
        (arg) => {
            if (typeof arg === "string") {
                const parsedDate = new Date(arg);
                console.log("Preprocessed Date:", arg);
                return isNaN(parsedDate.getTime()) ? null : parsedDate;
            }
            return arg;
        },
        z.date({
            required_error: "Please provide a valid date",
        })
        .min(new Date(2016, 0, 1), "Date cannot be before January 1, 2016")
        .max(new Date(), "Date cannot be in the future")
    ),
    description: z.string().optional(),
    subject: subject,
    file: z.array(z.string()),
    examType: examType,
});


export type fileDto = z.infer< typeof fileUploadSchema>


