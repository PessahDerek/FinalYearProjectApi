import {model, Schema, Types} from "mongoose";
import {MemberModel} from "../../../env";
import {encryptString} from "../../libs/encrypters";
import Chama from "../../handlers/access/Chama";


const Members = new Schema<MemberModel>({
    firstName: String,
    lastName: String,
    email: { type: String, required: [true, "An email is required!"]},
    phone: { type: String, required: [true, "A valid phone number is required!"]},
    password: {type: String, required: [true, "A password is required!"], select: false},
    verified: {type: Boolean, default: false},
    role: {type: String, required: false, default: 'member'},
}, {timestamps: true})

Members.pre('save', function (next){
    if(this.isNew){
        try {
            this.password = encryptString(this.password)
        } catch (e) {
            console.log(`\tSERVICE: (Failure) Error encrypting user password:\t${e}`)
            next()
        }
    }
    next()
})

// update in chama
Members.post("save", async function (res, next){
    try{
        if(res.verified) {
            const chama = await Chama.findOne({})
            if (!chama) throw new Error("No chama model found!");
            chama.members = [...chama.members, res._id]
            await chama.save()
                .then(() => {
                    console.log("\tSERVICE: (Success)Member added to chama")
                    next()
                })
                .catch(err => {
                    throw new Error(err)
                })
        }
        next()
    } catch (e) {
        console.log(`\tSERVICE: (Failure) Error saving to member in chama:\t${e}`)
        next()
    }
})
export default model("Members", Members)
