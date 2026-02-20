import { Request, Response } from "express";
import { prisma } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";



export async function signupUser(req: any, res: Response) {

  try {

    const { email, password } = req.body;
    const projectId = req.projectId;

    const existing = await prisma.user.findFirst({
      where: {
        email,
        projectId
      }
    });

    if (existing) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        projectId
      }
    });

    const token = jwt.sign(
      {
        userId: user.id,
        projectId
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      userId: user.id
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Signup failed"
    });
  }
}



export async function loginUser(req: any, res: Response) {

  try {

    const { email, password } = req.body;
    const projectId = req.projectId;

    const user = await prisma.user.findFirst({
      where: {
        email,
        projectId
      }
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return res.status(400).json({
        error: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        projectId
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      userId: user.id
    });

  } catch {

    res.status(500).json({
      error: "Login failed"
    });
  }
}