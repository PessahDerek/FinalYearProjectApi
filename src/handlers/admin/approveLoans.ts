import {Handler} from "../../../env";
import Loans from "../../database/models/Loans";
import {respond} from "../../libs/shortFunctions";


export const approveLoans: Handler = async (req, res )=>{
    const {approved, denied} = req.body as {approved: string[], denied: string[]};
    try{
        const update1 = await Loans.updateMany({userId: {$in: approved}},
            {$set: {approved: true, pending: false}}
        )
        const update2 = await Loans.updateMany({userId: {$in: denied}},
            {$set: {approved: false, pending: false}}
        )
        const check1 = update2.acknowledged
        const check2 = update1.acknowledged
        if(check1 && check2) return respond(res, 200, "Updates completed");
        if(check1) return respond(res, 200, "Only the Denied loans have been updated!")
        if(check2) return respond(res, 200, "Only the Approved loans have been updated")
        respond(res, 400, "Something went wrong trying to update the list!")
    } catch (err){
        respond(res, 500, "Something went wrong trying to update the list!")
    }
}

