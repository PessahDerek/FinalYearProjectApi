import {Handler, ShareHistory} from "../../../env";
import Shares from "../../database/models/Shares";
import {respond} from "../../libs/shortFunctions";

/*
*  shareId: '65fb9eca986f26a12f0ccad6',
   mode: 'debit',
   amount: 50000
* */

export const updateShares: Handler = async (req, res) => {
    const {list} = req.body as { list: { shareId: string, mode: string, amount: number }[] }
    const bulkOperations = list.map(share => ({
        updateOne: {
            filter: {_id: share.shareId},
            update: {
                $push: {history: {amount: share.amount, date: new Date(), mode: share.mode} as ShareHistory}
            }
        }
    }));
    await Shares.bulkWrite(bulkOperations)
        .then(result => {
            console.log(result)
            if(result.modifiedCount !== list.length)
                return respond(res, 200, "Some accounts have not been successfully updated!")
            respond(res, 200, "All shares updated!")
        })
        .catch(err => {
            console.log("\t(API): Error saving shares");
            respond(res, 500, "Sorry, something went wrong while trying to update!")
        })
}

