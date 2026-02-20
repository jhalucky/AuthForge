import { Request, Response } from "express";
import { prisma } from "../config/db";
import { hashPassword, comparePassword } from "../services/password.service";
import { generateToken } from "../services/jwt.service";

export async function signupDeveloper(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const existing = await prisma.developer.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(400).json({
        error: "Developer already exists"
      });
    }

    const hashed = await hashPassword(password);

    const developer = await prisma.developer.create({
      data: {
        email,
        password: hashed
      }
    });

    const token = generateToken({
      developerId: developer.id
    });

    res.json({
      token,
      developerId: developer.id
    });

  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
}


export async function loginDeveloper(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const developer = await prisma.developer.findUnique({
      where: { email }
    });

    if (!developer) {
      return res.status(400).json({
        error: "Invalid credentials"
      });
    }

    const valid = await comparePassword(
      password,
      developer.password
    );

    if (!valid) {
      return res.status(400).json({
        error: "Invalid credentials"
      });
    }

    const token = generateToken({
      developerId: developer.id
    });

    res.json({
      token,
      developerId: developer.id
    });

  } catch {
    res.status(500).json({ error: "Login failed" });
  }
}