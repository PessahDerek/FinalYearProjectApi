import {Handler} from "express";
import {SignupDetails} from "../../../env";
import {emailIsValid, generateToken, respond} from "../../libs/shortFunctions";
import Members from "../../database/models/Members";
import mongoose from "mongoose";
import DeniedAdmissions from "../../database/models/DeniedAdmissions";


export const signup: Handler = async (req, res, next)=> {
    const { firstName,lastName,phone, email, password, confirmPassword  } = req.body as SignupDetails;
    // verify all fields
    const invalid = !firstName || !lastName || !phone || !email || !password || !confirmPassword;
    if(invalid) return respond(res, 400, "All fields are required!")
    // passwords match
    if(password !== confirmPassword) return respond(res, 400, "Passwords do not match")
    // no account exists
    const found = await Members.findOne({$or: [
            {phone: phone}, {email: email}
        ]})
    if(found) return respond(res, 400, "A similar account exists! Try logging in or check your credentials")
    const banned = await DeniedAdmissions.findOne({$or: [
            {phone: phone}, {email: email}
        ]})
    if(banned) return respond(res, 403, "You request to join was denied, you are not allowed to register or log in! Reach the admin for further clearance")
    const newMember = new Members(req.body);
    await newMember.save()
        .then(profile=>{
            const token = generateToken(profile._id.toString(), profile.role??"member")
            delete profile._id
            respond(res, 200, "Welcome to Umoja Teachers" ,{
                profile: profile.toObject(),
                token: token
            })
        })
        .catch(err => {
            if(err instanceof mongoose.MongooseError) {
                console.log(`\t(HANDLER: ): ${err}`)
                return respond(res, 500, err.message)
            }
            respond(res, 500, `\t(HANDLER: error)Sorry, something went wrong!
${err}`)
        })
}

