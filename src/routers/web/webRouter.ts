import {Router } from "express"
import authRoute from "./auth.route";
const webRouter = Router();



webRouter.use("/auth", authRoute)
webRouter.use("/question")



export default webRouter;