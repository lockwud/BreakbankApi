import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routers";
import { ErrorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4500;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  preflightContinue: true,
  optionsSuccessStatus: 204
}));

// Handle OPTIONS requests
app.options('*', cors());

// Base route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// API routes
app.use("/api", mainRouter);

// Error handler
app.use(ErrorHandler);

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});