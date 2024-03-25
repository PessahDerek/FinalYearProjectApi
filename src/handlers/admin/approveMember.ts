import {Handler} from "../../../env";
import Members from "../../database/models/Members";
import DeniedAdmissions from "../../database/models/DeniedAdmissions";
import {respond} from "../../libs/shortFunctions";
import Shares from "../../database/models/Shares";
import mongoose from "mongoose";
import {response} from "express";


export const approveMember: Handler = async (req, res) => {
    const { userId, role, initial } = req.body;
    const approved = req.method.toLowerCase() === 'put';
    if(!approved){
        const id = req.params.user_id;
        if(!id) return respond(res, 400, "An ID was not supplied, please refresh and try again!");
        const found = await DeniedAdmissions.findOne({_id: id});
        if(found) return respond(res, 200, "User was already deleted!")
        // update
        return await Members.findByIdAndDelete(id)
            .then((result) => {
                console.log("Result: ", result)
                const newDenied = new DeniedAdmissions({
                    _id: id,
                    email: result?.email??"",
                    phone: result?.phone??""
                })
                newDenied.save()
                    .then(()=>{
                        respond(res, 200, "User deleted!")
                    })
                    .catch(err => {
                        throw new Error(err)
                    })
            }).catch(err => {
                console.log(err)
                respond(res, 500, "Sorry something went wrong, please try again!")
            })
        ;
    } else {
        // verify user
        const member = await Members.findById(userId)
        if (!member) return respond(res, 200, "Sorry, we could not find the user!")
        if (member.verified) return respond(res, 200, "User is already verified!")
        // update user
        member.verified = true
        member.role = role;
        await member.save()
            .then(async () => {
                // create shares
                const newShare = new Shares({
                    member: new mongoose.Types.ObjectId(userId),
                    realValue: initial,
                    history: [
                        {amount: initial, date: new Date(), mode: 'debit'}
                    ]
                })
                await newShare.save()
                    .then(() => respond(res, 200, "Member has been verified!"))
                    .catch(err => console.log(`Failed to create Shares table: ${err}`))
            })
    }
}

