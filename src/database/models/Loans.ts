import mongoose, {model, Schema, Types} from "mongoose";
import {LoanModel, ShareHistory} from "../../../env";
import Chama from "../../handlers/access/Chama";

const Loans = new Schema<LoanModel>({
    userId: String,
    deadline: Date,
    interest: Number,
    principal: Number,
    value: Number,
    paid: {type: Boolean, default: false},
    penaltyRate: Number,
    approved: Boolean,
    pending: Boolean,
    defaulted: Boolean,
    history: [{}],
}, {timestamps: true})

Loans.post('save', async function (res, next){
    // update the chama model
    try {
        const chama = await Chama.findOne({});
        if (!chama) return next();

        // Update Chama with loan ID directly
        chama.loans = [...chama.loans, res._id]
        await chama.save()
            .then(() => {
                console.log(`\tSERVICE: (Success) Updated Chama successfully`);
                next()
            })
            .catch(err => {
                console.log(`\tSERVICE: (failure) Failed to update to Chama model\t\tReason: ${err}`);
                throw new Error(err)
            })
    } catch (e) {
        console.log(`\tSERVICE: (failure) Failed to update to Chama model\t\tReason: ${e}`);
        next()
    }
})
export default model("Loans", Loans)

