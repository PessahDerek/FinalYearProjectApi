import { Handler} from "../../env";
import {respond} from "../libs/shortFunctions";
import {verify,} from "jsonwebtoken";
import {CustomError} from "../libs/instances/CustomError";
import DeniedAdmissions from "../database/models/DeniedAdmissions";


export const Authorization: Handler = async (req, res, next) => {

    try {// find the token
        const token = req.headers.authorization;
        if (!token) throw new Error("No token from client");
        verify(token, process.env.SERVER_KEY, async (error, decoded)=>{
            if(error) throw new Error("Error decoding token!");
            if(!decoded || typeof decoded === 'string') throw new Error("Wrong return type from decoding");
            req.auth = {role: decoded.role, user_id: decoded.user_id}

            // check if they are denied
            const unverified = await DeniedAdmissions.findById(decoded.user_id);
            if(unverified) {
                res.setHeader("Denied_admission", `${new Date().toString()}`)
                return (respond(res, 403, "It seems your request to join was denied, " +
                    "you will be logged out! Please try sending a new signup request"))
            }

            // for admin routes
            if(req.url.includes("admin") && decoded.role !== 'admin') throw new CustomError({
                custom: true, message: "You need to be an admin to proceed!", status: 403
            })
            next()
        })
    } catch (e) {
        if(e instanceof CustomError) return respond(res, e.status, e.message)
        return respond(res, 403, "Please login or signup to continue!")
    }
}
