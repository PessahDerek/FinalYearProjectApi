import {Router} from "express";
import {Authorization} from "../middleware/Authorization";
import {getChamaDataForApp} from "../handlers/chama/getChamaData";


const chamaRoutes = Router();

chamaRoutes
    .get("/chama-data", Authorization, getChamaDataForApp)

export default chamaRoutes;

