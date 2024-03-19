import {Handler, LoanRequest} from "../../../env";
import Members from "../../database/models/Members";
import {respond} from "../../libs/shortFunctions";
import {compareWithHash} from "../../libs/encrypters";
import Loans from "../../database/models/Loans";
import Chama from "../access/Chama";


export const RequestLoan: Handler = async (req, res, next) => {
    const {amount, password} = req.body as LoanRequest;
    // verify password
    const member = await Members.findOne({
        $and: [
            {_id: req.auth?.user_id}, {verified: true}
        ]
    }).select("password")
    if(!member) return respond(res, 403, "You need to have a verified account to request for a loan!");
    const match = compareWithHash(password, member.password);
    if(!match) return respond(res, 403, "Incorrect password, please try again!"); // TODO: limit password retries in production

    const chama = await Chama.findOne({})

    const newLoan = new Loans({
        principal: amount,
        userId: req.auth?.user_id,
        approved: false,
    })
}
