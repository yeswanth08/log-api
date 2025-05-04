import { Request,Response,NextFunction } from 'express';
import { ApiError } from '../core/apiError';

export default function errorHandler(err: Error, req:Request,res:Response,next:NextFunction):void{
    if (err instanceof ApiError){
        ApiError.handle(err, res);
        return;
    }
    res.status(500).json({error: 'Unexpected Error Occured!'});
}