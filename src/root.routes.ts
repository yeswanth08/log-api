import express from "express";
import { isAdmin } from "./middlewares/admin.validate.middleware";
import {displayIncidents,displayIncidentsById} from "./controllers/displayIncidents";
import * as deleteController from "./controllers/deleteIncidents";
import * as addIncidentController from "./controllers/addIncidents";

const rootRouter = express.Router();

rootRouter.get("/incidents", displayIncidents);
rootRouter.get("/incidents/:id", displayIncidentsById);
rootRouter.post("/addwithauth/incidents", isAdmin,addIncidentController.addIncidents);
rootRouter.delete("/deletewithauth/incidents/:id",isAdmin,deleteController.deleteIncidents);

/**
 * as per the requirement,i am also adding the delete and add incident routes without auth middleware
 */

// This route is for adding incidents without authentication

rootRouter.post("/add/incidents", addIncidentController.addIncidents);
rootRouter.delete("/delete/incidents/:id", deleteController.deleteIncidents);

export { rootRouter };
