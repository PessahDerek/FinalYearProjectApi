import {Handler} from "../../../env";
import Loans from "../../database/models/Loans";
import Shares from "../../database/models/Shares";
import Members from "../../database/models/Members";
import {respond} from "../../libs/shortFunctions";
import Chama from "../access/Chama";


export const getChamaDataForApp: Handler = async (req, res) => {
    // all loans
    const loans = await Loans.find()
        .lean()
        .exec()
    // shares
    const shares = await Shares.find({})
    // members
    const members = await Members.find({})

    const chama = await Chama.findOne({})
        .populate("loans members shares")
        .populate({
            path: 'shares',
            populate: {
                path: "member"
            }
        })
        .lean()
        .exec();
    if(!chama) return respond(res, 400, "Sorry something went wrong!");

    respond(res, 200, "ok", {
        unpaidLoans: [...chama.loans.filter(loan => !loan.paid && loan.approved)],
        paidLoans: [...chama.loans.filter(loan => !loan.paid && loan.approved)],
        pendingLoans: [...chama.loans.filter(loan => !loan.approved)],
        shares: [...chama.shares],
        totalShares: chama.shares.reduce((acc, curr)=>acc+Number(curr.realValue), 0),
        members: chama.members,
        unverified: [...members.filter(f => !f.verified)]
    })
}

