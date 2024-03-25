import {Router} from "express";
import {approveLoans} from "../handlers/admin/approveLoans";
import {loanStatistics} from "../handlers/admin/loanStatistics";
import {updateLoans} from "../handlers/admin/updateLoans";
import {approveMember} from "../handlers/admin/approveMember";
import {updateShares} from "../handlers/admin/updateShares";


export const adminRoutes: Router = Router();

adminRoutes
    .get("/loan-stats", loanStatistics)
    .put("/approve-member", approveMember)
    .delete('/approve-member/:user_id', approveMember)
    .post("/approve-loans", approveLoans)
    .post("/update-loans", updateLoans)
    .post("/update-shares", updateShares)

export default adminRoutes;

