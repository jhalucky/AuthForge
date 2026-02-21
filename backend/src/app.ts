import express from "express";
import cors from "cors";

import developerRoutes from "./routes/developer.routes";
import authRoutes from "./routes/auth.routes";  
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes"
const app = express();

app.use(cors());
app.use(express.json());

app.use("/developer", developerRoutes);

app.use("/auth", authRoutes);
app.use("/project", projectRoutes)

app.use("/user", userRoutes)
app.get("/", (req, res) => {
  res.send("AuthForge running");
});

export default app;