import {Handler, LoaneeStat} from "../../../env";
import Chama from "../access/Chama";
import {respond} from "../../libs/shortFunctions";


export const loanStatistics: Handler = async (req, res)=>{
    const chama = await Chama.findOne({})
        .populate('members loans shares')
        .exec()
    if(!chama) return respond(res, 500, "Sorry something went wrong!");
    res.status(200).send(chama)
}

