import { Request, NextFunction, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      isAdmin: () => boolean;
      isEmployee: () => boolean;
      user: any;
    }
  }
}

export const authorization = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  req.isAdmin = function isAdmin() {
    return req.user.role === "admin";
  };
  req.isEmployee = function isEmployee() {
    return req.user.role === "employee";
  };
  return next();
};
