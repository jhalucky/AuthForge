import express from "express";
import {
  signupDeveloper,
  loginDeveloper
} from "../controllers/developer.controller";

const router = express.Router();

router.post("/signup", signupDeveloper);
router.post("/login", loginDeveloper);

export default router;