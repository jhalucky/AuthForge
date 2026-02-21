import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
} from "../controllers/project.controller";

import { verifyDeveloperToken } from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * Create project
 */
router.post(
  "/",
  verifyDeveloperToken,
  createProject
);

/**
 * Get all projects
 */
router.get(
  "/",
  verifyDeveloperToken,
  getProjects
);

/**
 * Get single project
 */
router.get(
  "/:id",
  verifyDeveloperToken,
  getProjectById
);

export default router;