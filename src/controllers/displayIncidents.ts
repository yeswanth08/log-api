import { NextFunction, Request, Response } from "express";
import prisma_client from "../config/prisma";
import { findAll, findById } from "../core/prismaFunctions";
import { redis_queue_client } from "../config/redis";
import { SuccessResponse } from "../core/apiResponse";
import { NotFoundError } from "../core/apiError";

export async function displayIncidents(req: Request, res: Response, next: NextFunction) {
    try {
        const cached = await redis_queue_client.get("incidents:all"); 
        if (cached) {
            new SuccessResponse("Displayed", JSON.parse(cached)).send(res);
            return;// to avoid the double call to the database
        }
        const response = await findAll(prisma_client.incident);
        if (response) {
            await redis_queue_client.set("incidents:all", JSON.stringify(response), 'EX', 10);
        }
                /**
                 * the ttl is set to 10 seconds for the cache due to testing purposes
                 */

        const message = response.length > 0 ? "Displayed" : "No incidents found";
        new SuccessResponse(message, response).send(res);
    } catch (error) {
        next(error);
    }
}

export async function displayIncidentsById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const cached = await redis_queue_client.get(`incident:${id}`);
        if (cached) {
            new SuccessResponse("Displayed", JSON.parse(cached)).send(res);
            return; // to avoid the double call to the database
        }
        const response = await findById(prisma_client.incident, Number(id));
        if (!response) return next(new NotFoundError("Incident not found"));

        await redis_queue_client.set(`incident:${id}`, JSON.stringify(response), 'EX', 5);
        new SuccessResponse("Displayed", response).send(res);
    } catch (error) {
        next(error);
    }
}