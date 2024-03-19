import {Handler} from "../../../env";
import Loans from "../../database/models/Loans";
import Shares from "../../database/models/Shares";
import Members from "../../database/models/Members";
import {respond} from "../../libs/shortFunctions";


export const getChamaDataForApp: Handler = async (req, res) => {
    // all loans
    const loans = await Loans.find({}, {toJSON: true})
    // shares
    const shares = await Shares.find({}, {toJSON: true})
    // members
    const members = await Members.find({}, {toJSON: true})

    respond(res, 200, "ok", {
        unpaidLoans: loans.filter(loan => !loan.paid),
        paidLoans: loans.filter(loan => !loan.paid),
        shares: shares.reduce((acc, curr)=>acc+Number(curr.realValue), 0),
        members: members,
    })
}

