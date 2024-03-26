import {Router} from "express";
import {getMemberProperties} from "../handlers/member/getMemberProperties";
import {requestLoan} from "../handlers/member/requestLoan";
import {updateProfile} from "../handlers/member/updateProfile";


const memberRoutes = Router();

memberRoutes
    .get("/my-data", getMemberProperties)
    .post("/request-loan", requestLoan)
    .put("/edit-profile", updateProfile)

export default memberRoutes;

