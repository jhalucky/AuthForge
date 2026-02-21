import { Request, Response } from "express";
import crypto from "crypto";
import prisma from "../config/db";

/**
 * Create Project
 */
export const createProject = async (req: Request, res: Response) => {
  try {
    const developerId = (req as any).developerId as string;
    console.log("Developer ID from token:", developerId);
    const { name } = req.body;

    // Validation
    if (!developerId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    if (!name || (name as string).trim() === "") {
      return res.status(400).json({
        error: "Project name is required",
      });
    }

    // Generate keys
    const publicKey = "pk_" + crypto.randomBytes(16).toString("hex");
    const secretKey = "sk_" + crypto.randomBytes(32).toString("hex");
    const apiKey = crypto.randomBytes(32).toString("hex");

    // Create project
    const project = await prisma.project.create({
      data: {
        name,
        publicKey,
        secretKey,
        apiKey,
        developerId,
      },
    });

    return res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create Project Error:", error);

    return res.status(500).json({
      error: "Failed to create project",
    });
  }
};

/**
 * Get all projects of logged-in developer
 */
export const getProjects = async (req: Request, res: Response) => {
  try {
    const developerId = (req as any).developerId as string;

    if (!developerId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const projects = await prisma.project.findMany({
      where: {
        developerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);

    return res.status(500).json({
      error: "Failed to fetch projects",
    });
  }
};

/**
 * Get single project
 */
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const developerId = (req as any).developerId as string;
    const { id } = req.params as { id: string };

    if (!developerId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    if (!id) {
      return res.status(400).json({
        error: "Project ID required",
      });
    }

    const project = await prisma.project.findFirst({
      where: {
        id,
        developerId,
      },
    });

    if (!project) {
      return res.status(404).json({
        error: "Project not found",
      });
    }

    return res.json({
      project,
    });
  } catch (error) {
    console.error("Get Project Error:", error);

    return res.status(500).json({
      error: "Failed to fetch project",
    });
  }
};