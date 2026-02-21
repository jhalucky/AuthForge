import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const verifyDeveloperToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET) as any;

    // VERY IMPORTANT LINE
    (req as any).developerId = decoded.developerId;

    next();

  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};