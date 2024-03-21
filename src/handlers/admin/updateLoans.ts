import {Handler, LoanHistory, RepayObj} from "../../../env";
import Loans from "../../database/models/Loans";
import {respond} from "../../libs/shortFunctions";


export const updateLoans: Handler = async (req, res) => {
    const { list } = req.body as { list: RepayObj[] }

    const bulkOperations = list.map(loan => ({
        updateOne: {
            filter: { _id: loan.loanId },
            update: {
                $push: { history: { amount: loan.amount, date: new Date() } }
            }
        }
    }));

    await Loans.bulkWrite(bulkOperations)
        .then(result => {
            console.log(result)
            respond(res, 200, "List has been updated!")
        })
        .catch(err => {
            console.log(err)
            respond(res, 500, "Sorry something went wrong, please try again!")
        })
}

