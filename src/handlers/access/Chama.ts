import mongoose, {Schema} from "mongoose";


const Chama = new Schema({
    name: {type: String, required: true},
    interestRate: {type: Number, required: false},
})

export default mongoose.model("Chama", Chama);
