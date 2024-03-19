import {model, Schema} from "mongoose";
import {LoanModel} from "../../../env";


const Loans = new Schema<LoanModel>({
    userId: String,
    deadline: Date,
    interest: Number,
    principal: Number,
    value: Number,
    paid: {type: Boolean, default: false},
    penaltyRate: Number,
    approved: Boolean
})

export default model("Loans", Loans)
