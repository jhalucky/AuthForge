import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  userId?: string;
  projectId?: string;
}

export const verifyUserToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization header missing"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Token missing"
      });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as any;

    req.userId = decoded.userId;
    req.projectId = decoded.projectId;

    next();

  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token"
    });
  }
};