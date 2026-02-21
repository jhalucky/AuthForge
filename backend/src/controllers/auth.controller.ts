import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";


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
export const getMe = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json({
        error: "No token"
      });
    }

    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET) as any;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      }
    });

    res.json({
      user
    });

  } catch (error) {
    res.status(401).json({
      error: "Invalid token"
    });
  }
};