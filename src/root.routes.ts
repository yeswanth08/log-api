import express from "express";
import { isAdmin } from "./middlewares/admin.validate.middleware";
import {displayIncidents,displayIncidentsById} from "./controllers/displayIncidents";
import * as deleteController from "./controllers/deleteIncidents";
import * as addIncidentController from "./controllers/addIncidents";

const rootRouter = express.Router();

rootRouter.get("/incidents", displayIncidents);
rootRouter.get("/incidents/:id", displayIncidentsById);
rootRouter.post("/addincidents", isAdmin,addIncidentController.addIncidents);
rootRouter.delete("/deleteincidents/:id",isAdmin,deleteController.deleteIncidents)

export { rootRouter };
