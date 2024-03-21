import {Router} from "express";
import {getMemberProperties} from "../handlers/member/getMemberProperties";
import {requestLoan} from "../handlers/member/requestLoan";


const memberRoutes = Router();

memberRoutes
    .get("/my-data", getMemberProperties)
    .post("/request-loan", requestLoan)

export default memberRoutes;

