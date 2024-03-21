import {Router} from "express";
import auth from "./auth";
import memberRoutes from "./memberRoutes";
import chamaRoutes from "./chamaRoutes";
import {Authorization} from "../middleware/Authorization";
import adminRoutes from "./adminRoutes";


const Routes = Router();

Routes
    .use("/auth",auth)
    .use(Authorization)
    .use("/member", memberRoutes)
    .use("/chama", chamaRoutes)
    .use("/admin", adminRoutes)

export default Routes;
