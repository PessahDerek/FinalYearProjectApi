import * as mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export const ConnectDatabase = () => {
    const connectDatabase = new Promise((resolve, reject)=>{
            mongoose.connect(
                process.env.DB_URL
            ).then(()=> {
                console.log("Database connected")
                resolve(true)
            })
                .catch(err => {
                    console.log("Error connecting to database\nRetrying in 3 seconds...")
                    setTimeout(()=>{
                        return ConnectDatabase()
                    }, 3000)
                })
        }
    )
    mongoose.connection?.on('error', ()=>{
        console.log("Mongoose ran into an error!\nRetrying the connection in 3 seconds...")
        setTimeout(()=>connectDatabase, 3000)
    })
    return connectDatabase;
}

