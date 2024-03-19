import {Handler} from "express";
import {LoginDetails} from "../../../env";
import Members from "../../database/models/Members";
import {generateToken, respond} from "../../libs/shortFunctions";
import {compareWithHash} from "../../libs/encrypters";


export const login: Handler = async (req, res) => {
    const { identifier, password } = req.body as LoginDetails;
    const found = await Members.findOne({$or: [
            {phone: identifier},
            {email: identifier},
            {firstName: identifier},
            {lastName: identifier}
        ]
    }).select("+password")
    if(!found) return respond(res, 400, "No account exists, signup instead!");
    const match = compareWithHash(password, found.password);
    if(!match) return respond(res, 400, "Wrong credentials or password!")
    const token = generateToken(found._id, found.role??"member");
    const profile = found.toObject();
    delete profile._id;
    Object.assign(profile, {password: ""}) // IMPORTANT
    respond(res, 200, "Welcome back", {
        token: token,
        profile: profile
    })
}

