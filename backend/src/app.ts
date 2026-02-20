import express from "express";
import cors from "cors";

import developerRoutes from "./routes/developer.routes";
import projectRoutes from "./routes/project.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/developer", developerRoutes);
app.use("/projects", projectRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("AuthForge running");
});

export default app;