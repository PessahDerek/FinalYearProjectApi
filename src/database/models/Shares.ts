import mongoose, {model, Schema} from "mongoose";
import {ShareModel} from "../../../env";


const Shares = new Schema<ShareModel>({
    history: [{}],
    realValue: Number,
    member: {type: mongoose.Types.ObjectId, ref: 'Members'}
})

export default model("Shares", Shares)

