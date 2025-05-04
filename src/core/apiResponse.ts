import { Response } from 'express';

export class SuccessResponse<T> {
    constructor(public message: string, public data: T) {}
  
    send(res: Response): Response {
      return res.status(200).json({ message: this.message, data: this.data });
    }
  }
  