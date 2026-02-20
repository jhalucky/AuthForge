import express from "express";

import {
  signupUser,
  loginUser
} from "../controllers/auth.controller";

import { apiKeyMiddleware } from "../middlewares/apiKey.middleware";

const router = express.Router();



router.post(
  "/signup",
  apiKeyMiddleware,
  signupUser
);

router.post(
  "/login",
  apiKeyMiddleware,
  loginUser
);



export default router;