import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../core/apiError";
import { redis_queue_client } from "../config/redis";
import { findById } from "../core/prismaFunctions";
import prisma_client from "../config/prisma";

export async function isExitst(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return next(new NotFoundError("Invalid ID"));
    }
    /**
     * we can check the incident in the redis cache first,if not found then we can check in the database
     * if not found in the database then we can return 404 error
     */
    const isExistsInCache = await redis_queue_client.get(`incident:${id}`);
    if (isExistsInCache) return next();

    const isExistsInDB = await findById(prisma_client.incident, parseInt(id));
    if (!isExistsInDB) {
      return next(new NotFoundError("Incident not found"));
    }

    next(); 
  } catch (error) {
    next(error);
  }
}
