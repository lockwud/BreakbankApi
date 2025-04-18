import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routers";
import { ErrorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4500;
app.use(express.json()); // Must be before route handlers
app.use(morgan("dev"));

app.use(cors({
  origin: 'https://break-tawny.vercel.app', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

// ✅ Handle preflight OPTIONS requests
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", mainRouter)


app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});