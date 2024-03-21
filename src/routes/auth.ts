import {Router} from "express";
import {signup} from "../handlers/access/signup";
import {login} from "../handlers/access/login";
import {verifyEmail} from "../middleware/verifyEmail";
import {createAssociatedTables} from "../services/createAssociatedTables";


const router:Router = Router();

router
    .post('/signup', verifyEmail, signup, createAssociatedTables)
    .post("/login", login)

export default router;