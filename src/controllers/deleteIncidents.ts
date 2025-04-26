import { NextFunction, Request, Response } from "express";
import prisma_client from "../config/prisma";
import { deleteById } from "../core/prismaFunctions";
import { InternalErrorResponse, SuccessResponse } from "../core/apiResponseError";

const deleteIncidents = async (req:Request, res:Response,next:NextFunction) => {
    try{
        const { id } = req.params;
        const result = await deleteById(prisma_client.incident,Number(id));
        new SuccessResponse("deleted succesfully",result).send(res);
    }catch(error){
        next(new InternalErrorResponse("InternalError"));
    }
}

export {deleteIncidents};