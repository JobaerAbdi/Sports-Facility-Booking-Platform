import { NextFunction, Request, Response } from "express";

export const NotFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
};
