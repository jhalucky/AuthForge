import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AuthRequest } from "../middlewares/userAuth.middleware";


// USER SIGNUP
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { email, password, publicKey } = req.body;

    if (!email || !password || !publicKey) {
      return res.status(400).json({
        error: "email, password, publicKey required"
      });
    }

    // Find project using publicKey
    const project = await prisma.project.findUnique({
      where: { publicKey }
    });

    if (!project) {
      return res.status(404).json({
        error: "Invalid publicKey"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        projectId: project.id
      }
    });

    // Create JWT
    const token = jwt.sign(
      {
        userId: user.id,
        projectId: project.id
      },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "User created",
      token,
      userId: user.id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Signup failed"
    });
  }
};



// USER LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password, publicKey } = req.body;

    const project = await prisma.project.findUnique({
      where: { publicKey }
    });

    if (!project) {
      return res.status(404).json({
        error: "Invalid publicKey"
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
        projectId: project.id
      }
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        error: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        projectId: project.id
      },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login success",
      token
    });

  } catch (error) {
    res.status(500).json({
      error: "Login failed"
    });
  }
};



// GET CURRENT USER
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized"
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
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
        error: "User not found"
      });
    }

    res.json({
      user
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch user"
    });
  }
};