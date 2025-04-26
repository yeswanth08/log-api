import { NextFunction, Request, Response } from "express";
import prisma_client from "../config/prisma";
import { createRow } from "../core/prismaFunctions";
import { InternalErrorResponse, SuccessResponse } from "../core/apiResponseError";

export async function addIncidents(req: Request, res: Response, next: NextFunction) {
    try{
        const {title, description, severity, reportedAt} = req.body;
        const result = await createRow(prisma_client.incident,{
            title,
            description,
            severity,
            reportedAt: new Date(reportedAt),
        });
        new SuccessResponse("added successfully",result).send(res);
    }catch(error){
        next(new InternalErrorResponse("InternalError"));
    }
}
