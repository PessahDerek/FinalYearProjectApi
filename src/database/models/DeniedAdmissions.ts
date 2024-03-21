import {model, Schema} from "mongoose";


const DeniedAdmissions = new Schema({
    _id: {type: String, required: true},
    reason: {type: String, required: false, default: "Sorry, you do not meet criteria to join us.\nYou can always get in " +
            "in touch with management to discuss further.\nFor now you will be logged out of your temporary account and " +
            "won't be able to log in until you create a new account and get approved.\nThank you."}
})

export default model("DeniedAdmissions", DeniedAdmissions)
