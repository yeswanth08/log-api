import { NextFunction, Request, Response } from "express";
import prisma_client from "../config/prisma";
import { deleteById, findAll } from "../core/prismaFunctions";
import { InternalErrorResponse, SuccessResponse, NotFoundResponse } from "../core/apiResponseError";
import { redis_pubsunb_client, redis_queue_client } from "../config/redis";

const deleteIncidents = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const result = await deleteById(prisma_client.incident, Number(id));
        if (!result) {
            return next(new NotFoundResponse("Incident not found"));
        }
        await redis_queue_client.del("incidents:all");
        await redis_queue_client.del(`incidents:${id}`);

        const incidents = await findAll(prisma_client.incident);
        await redis_queue_client.set("incidents:all", JSON.stringify(incidents));
        await redis_queue_client.set(`incidents:${id}`, JSON.stringify(result));
        
        new SuccessResponse("Deleted successfully", result).send(res);
        await redis_pubsunb_client.publish("incidents", JSON.stringify({
            id: id,
            action: "delete",
        }));
    } catch (error) {
        console.error("Error in deleting incident:", error);
        next(new InternalErrorResponse("InternalError"));
    }
};

export { deleteIncidents };
