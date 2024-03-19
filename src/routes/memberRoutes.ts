import {Router} from "express";
import {getMemberProperties} from "../handlers/member/getMemberProperties";


const memberRoutes = Router();

memberRoutes
    .get("/my-data", getMemberProperties)
    .post("/request-loan", )

export default memberRoutes;

