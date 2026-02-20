import { Request, Response } from "express";
import { prisma } from "../config/db";
import { generateApiKey } from "../utils/generateApiKey";

export async function createProject(req: any, res: Response) {
  try {

    const developerId = req.developerId;
    const { name } = req.body;

    const apiKey = generateApiKey();

    const project = await prisma.project.create({
      data: {
        name,
        apiKey,
        developerId
      }
    });

    res.json(project);

  } catch {
    res.status(500).json({
      error: "Project creation failed"
    });
  }
}


export async function getProjects(req: any, res: Response) {

  const developerId = req.developerId;

  const projects = await prisma.project.findMany({
    where: { developerId }
  });

  res.json(projects);
}