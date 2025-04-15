import { Router } from "express"
import webRouter from "./web/webRouter";
const mainRouter = Router();

// Web routes
mainRouter.use("/web", webRouter);

export default mainRouter;