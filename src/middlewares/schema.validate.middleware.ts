import Z  from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestResponse } from "../core/apiResponseError";

const incidentSchema = Z.object({
    title: Z.string().min(1, "Title is required"),
    description: Z.string().min(1, "Description is required"),
    severity: Z.enum(["low", "medium", "high"], { errorMap: () => ({ message: "Severity must be low, medium, or high" }) })
});


export const validateIncident = (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {title,description,severity} = req.body;
        const result = incidentSchema.safeParse({
            title,
            description,
            severity: severity.toLowerCase()
        });
        if (!result.success) new BadRequestResponse(result.error.errors[0].message).send(res);
        next();
    }catch(error){
        new BadRequestResponse("Invalid Response").send(res);
    }
}