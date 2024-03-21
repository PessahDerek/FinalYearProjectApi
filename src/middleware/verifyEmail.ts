import {Handler} from "../../env";
import {emailIsValid, respond} from "../libs/shortFunctions";


export const verifyEmail: Handler = async (req, res, next) => {
    const {email} = req.body;
    if(!email) return next();
    const isValid = await emailIsValid(email)
    if(isValid){
        next()
    } else {
        console.log(`\t(MIDDLEWARE)Invalid Email: ${email}`)
        respond(res, 400, "Please use valid email!")
    }
}

