import { NextFunction, Request, Response } from "express";
import { BadRequestResponse, InternalErrorResponse, SuccessResponse } from "../core/apiResponseError";
import { redis_pubsunb_client, redis_queue_client } from "../config/redis";

export async function addIncidents(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, description, severity } = req.body;
        const newIncident = { title, description, severity, reportedAt: new Date().toISOString() };
        await redis_queue_client.lpush("incidents", JSON.stringify(newIncident));
        await redis_pubsunb_client.publish("incidents", JSON.stringify(newIncident));
        new SuccessResponse("added to queue successfully", newIncident).send(res);
    } catch (error) {
        console.error("Error adding incident:", error);
        next(new InternalErrorResponse("InternalError"));
    }
}
