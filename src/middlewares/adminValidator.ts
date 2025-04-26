import prisma_client from "../config/prisma";
import { NextFunction, Request, Response } from 'express';
import { findFirst } from "../core/prismaFunctions";
import { BadRequestResponse, InternalErrorResponse } from "../core/apiResponseError";

async function isAdmin(req:Request, res:Response, next:NextFunction) {
    try{
        const {name,password} = req.body;
        const response = await findFirst(prisma_client.admin, {
            name:name,
            password:password
        });
        if (response) {
            next();
        }else{
            next(new BadRequestResponse("Unauthorized access"));
        }
    }catch(err){
        next(new InternalErrorResponse("InternalError"));
    }
}

export {isAdmin};