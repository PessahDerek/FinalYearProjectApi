import mongoose, {model, Schema} from "mongoose";
import {ShareModel} from "../../../env";
import Chama from "../../handlers/access/Chama";


const Shares = new Schema<ShareModel>({
    history: [{}],
    realValue: Number,
    member: {type: mongoose.Types.ObjectId, ref: 'Members'}
})

Shares.post("save", async function (res, next){
    try{
        const chama = await Chama.findOne({})
        if(!chama) throw new Error("No chama model found!");
        chama.shares = [...chama.shares, res._id]
        await chama.save()
            .then(()=>console.log("\tSERVICE: (Success) Member's Shares added to chama"))
            .catch(err =>{
                throw new Error(err)
            })
    } catch (e) {
        console.log(`\tSERVICE: (Failure) Error saving to member's Share in chama:
        \t${e}`)
    }
})

export default model("Shares", Shares)

