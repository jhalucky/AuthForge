import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt.service";

export function authMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "No token"
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const payload: any = verifyToken(token);

    req.developerId = payload.developerId;

    next();

  } catch {
    return res.status(401).json({
      error: "Invalid token"
    });
  }
}