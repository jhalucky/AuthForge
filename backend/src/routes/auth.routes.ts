import { Router } from "express";

import {
  signupUser,
  loginUser,
  getMe
} from "../controllers/auth.controller";

import { verifyToken } from "../controllers/verify.controller";

import { verifyUserToken } from "../middlewares/userAuth.middleware";

const router = Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/verify", verifyToken);

router.get("/me", verifyUserToken, getMe);

export default router;