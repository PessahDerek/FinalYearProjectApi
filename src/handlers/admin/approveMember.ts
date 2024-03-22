import {Handler} from "../../../env";
import Members from "../../database/models/Members";
import DeniedAdmissions from "../../database/models/DeniedAdmissions";
import {respond} from "../../libs/shortFunctions";
import Shares from "../../database/models/Shares";
import mongoose from "mongoose";


export const approveMember: Handler = async (req, res) => {
    const { userId, role, initial } = req.body;
    const approved = req.method.toLowerCase() === 'put';
    if(!approved){
        // update
        return await Members.findByIdAndDelete(userId)
            .then(() => {
                const newDenied = new DeniedAdmissions({
                    _id: userId,
                })
                newDenied.save()
                    .then(()=>respond(res, 200, "Changes saved!"))
                    .catch(err => {
                        throw new Error(err)
                    })
            }).catch(err => {
                console.log(err)
                respond(res, 500, "Sorry something went wrong, please try again!")
            })
        ;
    }
    console.log("here...")
    // verify user
    const member = await Members.findById(userId)
    if(!member) return respond(res, 200, "Sorry, we could not find the user!")
    if(member.verified) return respond(res, 200, "User is already verified!")
    // update user
    member.verified = true
    member.role = role;
    await member.save()
        .then(async ()=>{
            // create shares
            const newShare = new Shares({
                member: new mongoose.Types.ObjectId(userId),
                realValue: initial,
                history: [
                    {amount: initial, date: new Date(), mode: 'debit'}
                ]
            })
            await newShare.save()
                .then(()=>respond(res, 200, "Member has been verified!"))
                .catch(err => console.log(`Failed to create Shares table: ${err}`))
        })
}

