import {Handler} from "../../env";


export const myMorgan: Handler = async (req, res, next) => {
    console.log(`\t${req.url} :- ${new Date().toUTCString()}\n`)
    next()
}

