import { validatePayload } from './../../middlewares/validate-payload';
import { Router } from "express";
import * as auth from "../../auth/auth.controller"
import {authenticateJWT} from "../../utils/jsonwebtoken"
const authRoute = Router();


authRoute.post("/signup", 
    auth.signUp
);

authRoute.post("/login", 
    auth.login
);

export default authRoute