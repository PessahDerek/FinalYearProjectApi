import {Handler} from "../../../env";
import Loans from "../../database/models/Loans";
import Shares from "../../database/models/Shares";
import {respond} from "../../libs/shortFunctions";


export const getMemberProperties: Handler = async (req, res) => {
    // fetch all loans
    const loans = await Loans.find({userId: req.auth?.user_id})
        .lean()
        .exec();
    // fetch shares
    const shares = await Shares.findOne({member: req.auth?.user_id})
        .lean()
        .exec();

    respond(res, 200, "", {
        unpaidLoans: [...loans.filter(loan => !loan.paid && loan.approved)],
        paidLoans: [...loans.filter(loan => loan.paid && loan.approved)],
        pendingLoans: [...loans.filter(loan => !loan.approved)],
        shares: shares
    })
}

