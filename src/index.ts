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
app.use(cors())
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://break-tawny.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Handle preflight OPTIONS requests
app.options('*', cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", mainRouter)


app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});