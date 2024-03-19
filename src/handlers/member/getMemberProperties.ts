import {Handler} from "../../../env";
import Loans from "../../database/models/Loans";
import Shares from "../../database/models/Shares";
import {respond} from "../../libs/shortFunctions";


export const getMemberProperties: Handler = async (req, res) => {
    // fetch all loans
    const loans = await Loans.find({$and: [
        {userId: req.auth?.user_id}, {approved: true}
        ]}, {toJSON: true});
    // fetch shares
    const shares = await Shares.findOne({member: req.auth?.user_id})
        .populate('member')
        .exec();
    respond(res, 200, "", {
        unpaidLoans: loans.filter(loan => !loan.paid),
        paidLoans: loans.filter(loan => loan.paid),
        shares: shares
    })
}

