import express from "express";
import * as contrllers from "./controllers/index";
import * as middlewares from "./middlewares/index";
import asyncHandler from "express-async-handler";

const rootRouter = express.Router();

rootRouter.get("/incidents", asyncHandler(contrllers.displayIncidents));
rootRouter.get("/incidents/:id", asyncHandler(contrllers.displayIncidentsById));
rootRouter.post("/addwithauth/incidents",middlewares.validateIncident,asyncHandler(middlewares.isAdmin),asyncHandler(contrllers.addIncidents));
rootRouter.delete("/deletewithauth/incidents/:id",asyncHandler(middlewares.isAdmin),asyncHandler(middlewares.isExitst),asyncHandler(contrllers.deleteIncidents));

/**
 * as per the requirement,i am also adding the delete and add incident routes without auth middleware
 */

// This route is for adding incidents without authentication

rootRouter.post("/add/incidents",middlewares.validateIncident,asyncHandler(contrllers.addIncidents));
rootRouter.delete("/delete/incidents/:id", asyncHandler(middlewares.isExitst),asyncHandler(contrllers.deleteIncidents));

export { rootRouter };
