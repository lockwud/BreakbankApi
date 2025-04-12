import {Router } from "express"
const webRouter = Router();
import authRoute from "./auth.route";
import reportRoute from "./itemReport.route";



webRouter.use("/auth", authRoute)
webRouter.use("/report", reportRoute)



export default webRouter;