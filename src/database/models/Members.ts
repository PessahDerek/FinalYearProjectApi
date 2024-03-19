import {model, Schema} from "mongoose";
import {MemberModel} from "../../../env";
import {encryptString} from "../../libs/encrypters";


const Members = new Schema<MemberModel>({
    firstName: String,
    lastName: String,
    email: { type: String, required: [true, "An email is required!"]},
    phone: { type: String, required: [true, "A valid phone number is required!"]},
    password: {type: String, required: [true, "A password is required!"], select: false},
    verified: {type: Boolean, default: false},
    role: {type: String, required: false, default: 'member'}
})

Members.pre('save', function (next){
    this.password = encryptString(this.password)
    next()
})
export default model("Members", Members)
