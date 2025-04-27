import { NextFunction, Request, Response } from "express";
import prisma_client from "../config/prisma";
import { findAll, findById } from "../core/prismaFunctions";
import { InternalErrorResponse, SuccessResponse, NotFoundResponse } from "../core/apiResponseError";
import { redis_queue_client } from "../config/redis";

export async function displayIncidents(req: Request, res: Response, next: NextFunction) {
    try {
        const cached = await redis_queue_client.get("incidents:all"); 
        if (cached) {
            const response = JSON.parse(cached);
            new SuccessResponse("Displayed", response).send(res);
        } else {
            const response = await findAll(prisma_client.incident);
            if (response.length > 0) {
                await redis_queue_client.set('incidents:all', JSON.stringify(response), 'EX', 90);
                new SuccessResponse("Displayed", response).send(res);
            } else {
                new SuccessResponse("No incidents found", []).send(res);
            }
        }
    } catch (error) {
        next(new InternalErrorResponse("InternalError"));
    }
};

export async function displayIncidentsById(req: Request, res: Response, next: NextFunction) {
    try {
        const cached = await redis_queue_client.get(`incident:${req.params.id}`);
        if (cached) {
            const response = JSON.parse(cached);
            new SuccessResponse("Displayed", response).send(res);
        } else {
            const response = await findById(prisma_client.incident, Number(req.params.id));
            if (response) {
                await redis_queue_client.set(`incident:${req.params.id}`, JSON.stringify(response), 'EX', 90);
                new SuccessResponse("Displayed", response).send(res);
            } else {
                next(new NotFoundResponse("Incident not found"));
            }
        }
    } catch (error) {
        next(new InternalErrorResponse("InternalError"));
    }
};
