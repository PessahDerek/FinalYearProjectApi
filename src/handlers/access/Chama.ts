import mongoose, {Schema} from "mongoose";
import Members from "../../database/models/Members";
import Loans from "../../database/models/Loans";
import Shares from "../../database/models/Shares";
import {ChamaModel} from "../../../env";


const Chama = new Schema<ChamaModel>({
    name: {
        type: String,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    penaltyRate: {
        type: Number,
        required: true
    },
    members: {
        type: [{type: mongoose.Types.ObjectId, ref: 'Members'}],
    },
    loans: {
        type: [{type: mongoose.Types.ObjectId, ref: 'Loans'}],
    },
    shares: {
        type: [{type: mongoose.Types.ObjectId, ref: 'Shares'}],
    }
})

export default mongoose.model("Chama", Chama);
