import {Router } from "express"
import authRoute from "./auth.route";
import uploadRoute from "./fileupload.route";
const webRouter = Router();



webRouter.use("/auth", authRoute)
webRouter.use("/question", uploadRoute)



export default webRouter;