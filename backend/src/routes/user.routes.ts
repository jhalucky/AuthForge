import { Router } from "express";
import { verifyDeveloperToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/profile", verifyDeveloperToken, (req: any, res) => {
  res.json({
    success: true,
    message: "Profile fetched",
    developer: req.developer
  });
});

export default router;