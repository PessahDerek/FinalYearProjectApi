import {Handler, LoanModel, LoanRequest} from "../../../env";
import Members from "../../database/models/Members";
import {respond} from "../../libs/shortFunctions";
import {compareWithHash} from "../../libs/encrypters";
import Loans from "../../database/models/Loans";
import Chama from "../access/Chama";
import {calculateLoanValue} from "../../libs/loans/calculateLoanValue";


export const requestLoan: Handler = async (req, res, next) => {
    const {amount, password, deadline} = req.body as LoanRequest;
    // verify password
    const member = await Members.findOne({
        $and: [
            {_id: req.auth?.user_id}, {verified: true}
        ]
    }).select("password")
    if(!member) return respond(res, 403, "You need a verified account to request for a loan!");
    const match = compareWithHash(password, member.password);
    if(!match) return respond(res, 403, "Incorrect password, please try again!"); // TODO: limit password retries in production

    // ensure they don't have a pending loan request
    const foundPending = await Loans.findOne({$and: [
            {userId: req.auth?.user_id}, {approved: false}
        ]})
    if(foundPending) return respond(res, 400, "Sorry, please wait for your previous loan request to be approved!")

    // get chama props to find updated properties of interest and penalty rates
    const chama = await Chama.findOne({name: "Umoja Teachers Self-Help Group"})
        .select("penaltyRate interestRate")
    if(chama === null)return respond(res, 500, "Sorry, something went wrong please again later!")

    // make sure deadline is not less than a month
    const diff = new Date(Date.now()+2629632000).getMilliseconds() - new Date(deadline).getMilliseconds();
    if(Math.floor(diff) < 30) return respond(res, 400, "Deadline has to be at least a month (30 days) from today!");

    // expected loan value
    const value = calculateLoanValue(
        chama.interestRate, amount, new Date(deadline)
    )
    const newLoan = new Loans({
        principal: amount,
        userId: req.auth?.user_id as string,
        interest: chama.interestRate??0,
        value: value,
        deadline: new Date(deadline),
        paid: false,
        penaltyRate: chama.penaltyRate,
        approved: false,
        pending: true,
        defaulted: false,
        history: []
    })
    await newLoan.save()
        .then((result)=>{
            respond(res, 200, "Your loan request has been received pending approval!")
        })
        .catch(err => {
            console.log(err)
            respond(res, 500, "Sorry, something went wrong, please try again later!")
        })
}
