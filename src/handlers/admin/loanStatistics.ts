import {Handler, LoaneeStat} from "../../../env";
import Chama from "../access/Chama";
import {respond} from "../../libs/shortFunctions";
import loans from "../../database/models/Loans";
import Loans from "../../database/models/Loans";


export const loanStatistics: Handler = async (req, res)=>{
    const loans = await Loans.find({})
    for(const loan of loans){
        console.log("Done...")
        const sum = loan.history.reduce((acc, curr)=>acc+curr.amount,0);
        if(sum >= (loan.principal + loan.value)){
            console.log("here")
            loan.updateOne({$set: {paid: true}})
                .then(x => console.log(x))
        }
    }
    const chama = await Chama.findOne({})
        .populate('members loans shares')
        .exec()
    if(!chama) return respond(res, 500, "Sorry something went wrong!");
    console.log("Complete...")
    res.status(200).send(chama)
}

