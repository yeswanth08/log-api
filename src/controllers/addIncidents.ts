import { NextFunction, Request, Response } from "express";
import { redis_queue_client } from "../config/redis";
import { SuccessResponse } from "../core/apiResponse";

export async function addIncidents(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, description, severity } = req.body;
        const newIncident = {
            title,
            description,
            severity,
            reportedAt: new Date().toISOString(),
            action: "create"
        };
        await redis_queue_client.lpush("incidents", JSON.stringify(newIncident));
        new SuccessResponse("Added to queue successfully", newIncident).send(res);
    } catch (error) {
        console.error("Error adding to queue:", error);
        next(error);
    }
}