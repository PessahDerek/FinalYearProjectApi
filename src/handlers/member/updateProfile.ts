import {Handler, UserProfile} from "../../../env";
import Members from "../../database/models/Members";
import {respond} from "../../libs/shortFunctions";


export const updateProfile: Handler = async (req,res)=>{
    const update = {};
    Object.keys(req.body).forEach(
        (key)=>req.body[key] && Object.assign(update, {[key]:req.body[key]})
    )
    console.log("update: ",update)
    await Members.findOneAndUpdate({_id: req.auth?.user_id}, {$set: update})
        .then(result=>{
            console.log("Update profile: ", result)
            const data = result?.toObject()
            respond(res, 200, "Updated!", {...data})
        })
        .catch(err => {
            console.log("Err: ", err)
            respond(res, 500, "Sorry, something went wrong!")
        })
}

