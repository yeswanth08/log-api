import { Response } from "express";
import { environment } from "./secrets";
import{
    AuthFailureResponse,
    InternalErrorResponse,
    BadRequestResponse,
    ForbiddenResponse
}from "./apiResponseError";

export enum ErrorType{
  UNAUTHORIZED = 'AuthFailureError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
}

export abstract class ApiError extends Error{
    constructor(public type: ErrorType, public message: string = 'error') {
        super(type);
    }
    public static handle(err:ApiError, res:Response):Response{
        switch(err.type){
            case ErrorType.UNAUTHORIZED:
                return new AuthFailureResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.INTERNAL:
                return new InternalErrorResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new BadRequestResponse(err.message).send(res);
            case ErrorType.FORBIDDEN:
                return new ForbiddenResponse(err.message).send(res);
            default: {
                let message = err.message;
                if (environment === 'development') message = 'Something wrong happened.';
                return new InternalErrorResponse(message).send(res);
              }
        }
    }
}


export class AuthFailureError extends ApiError {
    constructor(message = 'Invalid Credentials') {
      super(ErrorType.UNAUTHORIZED, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
      super(ErrorType.NOT_FOUND, message);
    }
}
  
export class ForbiddenError extends ApiError {
    constructor(message = 'Permission denied') {
      super(ErrorType.FORBIDDEN, message);
    }
}
  