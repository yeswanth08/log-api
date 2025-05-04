import { NextFunction, Request, Response } from "express";
import { redis_queue_client } from "../config/redis";
import { SuccessResponse } from "../core/apiResponse";

export const deleteIncidents = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const task = {
            id: Number(id),
            action: "delete"
        };
        await redis_queue_client.lpush("incidents", JSON.stringify(task));
        new SuccessResponse("Delete request queued", task).send(res);
    } catch (error) {
        next(error); 
    }
};
