import express, { Request, Response } from "express";
import axios from "axios";
import prisma from "../config/db";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const router = express.Router();

// ─── GOOGLE ───────────────────────────────────────────────

router.get("/google", (_req: Request, res: Response) => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri: `${env.BASE_URL}/auth/google/callback`,
      response_type: "code",
      scope: "openid email profile",
    }).toString();

  res.redirect(url);
});

router.get("/google/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      res.status(400).json({ error: "Missing code" });
      return;
    }

    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${env.BASE_URL}/auth/google/callback`,
      grant_type: "authorization_code",
    });

    const accessToken = tokenRes.data.access_token as string;

    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const email = userRes.data.email as string;

    if (!email) {
      res.status(400).json({ error: "No email returned from Google" });
      return;
    }

    let developer = await prisma.developer.findUnique({ where: { email } });

    if (!developer) {
      developer = await prisma.developer.create({
        data: { email, password: "oauth" },
      });
    }

    const token = jwt.sign(
      { developerId: developer.id },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`${env.FRONTEND_URL}?token=${token}`);
  } catch (error) {
    console.error("Google OAuth Error:", error);
    res.status(500).json({ error: "Google authentication failed" });
  }
});

// ─── GITHUB ───────────────────────────────────────────────

router.get("/github", (_req: Request, res: Response) => {
  const url =
    "https://github.com/login/oauth/authorize?" +
    new URLSearchParams({
      client_id: env.GITHUB_CLIENT_ID,
      redirect_uri: `${env.BASE_URL}/auth/github/callback`,
      scope: "user:email",
    }).toString();

  res.redirect(url);
});

router.get("/github/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      res.status(400).json({ error: "Missing code" });
      return;
    }

    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenRes.data.access_token as string;

    if (!accessToken) {
      res.status(400).json({ error: "Failed to get GitHub access token" });
      return;
    }

    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // GitHub may not return email directly — fetch from /user/emails
    let email = userRes.data.email as string | null;

    if (!email) {
      const emailsRes = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const primary = (emailsRes.data as { email: string; primary: boolean }[])
        .find((e) => e.primary);

      email = primary?.email ?? `${userRes.data.id as string}@github.com`;
    }

    let developer = await prisma.developer.findUnique({ where: { email } });

    if (!developer) {
      developer = await prisma.developer.create({
        data: { email, password: "oauth" },
      });
    }

    const token = jwt.sign(
      { developerId: developer.id },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`${env.FRONTEND_URL}?token=${token}`);
  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    res.status(500).json({ error: "GitHub authentication failed" });
  }
});

export default router;