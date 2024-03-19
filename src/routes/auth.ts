import {Router} from "express";
import {signup} from "../handlers/access/signup";
import {login} from "../handlers/access/login";
import {verifyEmail} from "../middleware/verifyEmail";


const router:Router = Router();

router
    .post('/signup', verifyEmail, signup)
    .post("/login", login)

export default router;