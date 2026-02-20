import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";

export async function apiKeyMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {

  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      error: "API key required"
    });
  }

  try {

    const project = await prisma.project.findUnique({
      where: {
        apiKey: apiKey as string
      }
    });

    if (!project) {
      return res.status(401).json({
        error: "Invalid API key"
      });
    }

    req.projectId = project.id;

    next();

  } catch {
    res.status(500).json({
      error: "API key validation failed"
    });
  }
}