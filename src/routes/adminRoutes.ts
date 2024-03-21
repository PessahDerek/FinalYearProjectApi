import {Router} from "express";
import {approveLoans} from "../handlers/admin/approveLoans";
import {loanStatistics} from "../handlers/admin/loanStatistics";
import {updateLoans} from "../handlers/admin/updateLoans";


export const adminRoutes: Router = Router();

adminRoutes
    .get("/loan-stats", loanStatistics)
    .post("/approve-member", )
    .post("/approve-loans", approveLoans)
    .post("/update-loans", updateLoans)

export default adminRoutes;

