import {Handler} from "../../env";
import Shares from "../database/models/Shares";
import mongoose from "mongoose";


export const createAssociatedTables: Handler = async (req, res) => {
    // member tables has already been created
    // Create share table, with minimum
    const newShare = new Shares({
        member: new mongoose.Types.ObjectId(req.body.userId),
        realValue: req.body.realValue,
        history: [
            {amount: req.body.amount, date: new Date(), mode: 'debit'}
        ]
    })
    await newShare.save()
        .then(() => console.log("\tSERVICE: Created share table for user: "))
        .catch(err => console.log(`\tSERVICE: Failed to create share table for user: 
\t${err}`))
}

