import prisma_client from "../config/prisma";
import { NextFunction, Request, Response } from 'express';
import { findFirst } from "../core/prismaFunctions";
import { InternalError, UnauthorizedError } from "../core/apiError";

async function isAdmin(req:Request, res:Response, next:NextFunction) {
    try{
        const {name,password} = req.body;
        const response = await findFirst(prisma_client.admin, {name,password});
        if (!response) return next(new UnauthorizedError("Unauthorized access"));
        next();
    }catch(err){
        next(new InternalError("InternalError"));
    }
}

export {isAdmin};