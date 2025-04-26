import { NextFunction, Request, Response } from "express";
import prisma_client from "../config/prisma";
import { findAll, findById } from "../core/prismaFunctions";
import { InternalErrorResponse, SuccessResponse } from "../core/apiResponseError";

export async function displayIncidents(req:Request, res:Response,next:NextFunction){
    try {
        const response = await findAll(prisma_client.incident);
        new SuccessResponse("displayed",response).send(res);
    } catch (error) {
        next(new InternalErrorResponse("InternalError"));
    }
};

export async function displayIncidentsById(req: Request, res: Response,next:NextFunction){
    try {
        const response = await findById(prisma_client.incident, Number(req.params.id));
        new SuccessResponse("displayed",response).send(res);
    } catch (error) {
        next(new InternalErrorResponse("InternalError"));
    }
};

