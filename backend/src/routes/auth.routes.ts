import { Router } from "express";
import {
  signupUser,
  loginUser,
  getMe
} from "../controllers/auth.controller";

import  { verifyToken } from "../controllers/verify.controller";

const router = Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/me", getMe);

router.post("/verify", verifyToken)

export default router;