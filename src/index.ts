import Express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import dotenv from 'dotenv'
import {ConnectDatabase} from "./database/init";
import Routes from "./routes/indexRoutes";
import {myMorgan} from "./middleware/myMorgan";
dotenv.config();

const app = Express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: 'Denied_admission'
}))

app.use(myMorgan)
app.use("/api", Routes)

ConnectDatabase()
    .then(()=>app.listen(process.env.PORT||5000, ()=>{
        console.log("Server running")
    }))
    .catch(err => {
        console.log(`Error running server:${err}`)
    })

