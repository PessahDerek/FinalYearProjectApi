import {Handler} from "../../env";
import {respond} from "../libs/shortFunctions";
import {verify, JwtPayload} from "jsonwebtoken";


export const Authorization: Handler = async (req, res, next) => {
    try {// find the token
        const token = req.headers.authorization;
        if (!token) throw new Error("No token from client");
        verify(token, process.env.SERVER_KEY, (error, decoded)=>{
            if(error) throw new Error("Error decoding token!");
            if(!decoded || typeof decoded === 'string') throw new Error("Wrong return type from decoding");
            req.auth = {role: decoded.role, user_id: decoded.user_id}
            next()
        })
    } catch (e) {
        return respond(res, 403, "Please login or signup to continue!")
    }
}

