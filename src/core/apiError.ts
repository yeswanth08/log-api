import {Response} from 'express';

export enum ErrorType {
    UNAUTHORIZED = 'UNAUTHORIZED',
    INTERNAL = 'INTERNAL',
    NOT_FOUND = 'NOT_FOUND',
    BAD_REQUEST = 'BAD_REQUEST',
    FORBIDDEN = 'FORBIDDEN',
  }
  
  export abstract class ApiError extends Error {
    constructor(public type: ErrorType, public message = 'error') {
      super(message);
    }
  
    public static handle(err: ApiError, res: Response): Response {
      switch (err.type) {
        case ErrorType.UNAUTHORIZED:
          return res.status(401).json({error: err.message});
        case ErrorType.BAD_REQUEST:
          return res.status(400).json({error: err.message});
        case ErrorType.NOT_FOUND:
          return res.status(404).json({error: err.message});
        case ErrorType.FORBIDDEN:
          return res.status(403).json({error: err.message});
        case ErrorType.INTERNAL:
          return res.status(500).json({error: err.message || 'Internal Server Error'});
        default:
          return res.status(500).json({error: err.message || 'Internal Server Error'});
      }
    }
  }
  
  export class NotFoundError extends ApiError {
    constructor(message = 'Not found') {
      super(ErrorType.NOT_FOUND, message);
    }
  }
  export class BadRequestError extends ApiError {
    constructor(message = 'Bad request') {
      super(ErrorType.BAD_REQUEST, message);
    }
  }
  export class InternalError extends ApiError {
    constructor(message = 'Internal server error') {
      super(ErrorType.INTERNAL, message);
    }
  }
  
  export class UnauthorizedError extends ApiError {
    constructor(message = 'Unauthorized') {
      super(ErrorType.UNAUTHORIZED, message);
    }
  }
  