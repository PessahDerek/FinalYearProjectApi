import {Response} from "express";
import {role} from "../../env";
import jwt from 'jsonwebtoken'
import {validate} from "email-validator";

export const respond = (res: Response, status: number, message: string, extra?: {}) => {
    res.statusCode = status;
    res.statusMessage = message;
    res.json({...extra ?? {}}).end()
}

export const emailIsValid = (email: string) => {
    return new Promise((resolve, reject)=>{
        const isMail = email.endsWith("gmail.com") || email.endsWith("hotmail.com") || email.endsWith("outlook.com") || email.endsWith("icloud.com")
        if (isMail) {
            resolve(validate(email))
        }
        resolve(false);
    })
}

export const generateToken = (user_id: string, role: role) => {
    return jwt.sign(
        {user_id: user_id, role: role},
        process.env.SERVER_KEY,
        {
            expiresIn: 604800000
        }
    )
}


