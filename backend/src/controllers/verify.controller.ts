import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db";
import { env } from "../config/env";

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        valid: false,
        error: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        valid: false,
        error: "Invalid token format"
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;

    // Fetch user
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      },
      select: {
        id: true,
        email: true,
        projectId: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        valid: false,
        error: "User not found"
      });
    }

    res.json({
      valid: true,
      user
    });

  } catch (error) {
    res.status(401).json({
      valid: false,
      error: "Invalid or expired token"
    });
  }
};