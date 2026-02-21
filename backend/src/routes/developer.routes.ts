import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import  prisma  from "../config/db";
import { env } from "../config/env";

const router = express.Router();



router.post("/signup", async (req, res) => {

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

    const hashed = await bcrypt.hash(password, 10);

    const developer = await prisma.developer.create({
      data: {
        email,
        password: hashed
      }
    });

    const token = jwt.sign(
      { developerId: developer.id },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      developerId: developer.id
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Signup failed"
    });
  }

});


export default router;