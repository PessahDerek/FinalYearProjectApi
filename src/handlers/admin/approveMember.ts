import {Handler} from "../../../env";
import Members from "../../database/models/Members";
import DeniedAdmissions from "../../database/models/DeniedAdmissions";
import {respond} from "../../libs/shortFunctions";
import Shares from "../../database/models/Shares";
import mongoose from "mongoose";


export const approveMember: Handler = async (req, res) => {
    const { userId, initialShare, approved, role, denialReason } = req.body;
    if(!approved){
        // update
        return await Members.findByIdAndDelete(userId)
            .then(() => {
                const newDenied = new DeniedAdmissions({
                    _id: userId,
                    reason: denialReason
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
    // verify user
    const member = await Members.findById(userId)
    if(!member) return respond(res, 200, "Sorry, we could not find the user!")

    // update user
    member.verified = true
    member.role = role;
    await member.save()
        .then(async ()=>{
            // create shares
            const newShare = new Shares({
                member: new mongoose.Types.ObjectId(userId),
                realValue: initialShare,
                history: [
                    {amount: initialShare, date: new Date(), mode: 'debit'}
                ]
            })
            await newShare.save()
                .catch(err => console.log(`Failed to create Shares table: ${err}`))
        })
}

