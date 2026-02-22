import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || "4000",
    JWT_SECRET: process.env.JWT_SECRET!,
    DATABASE_URL: process.env.DATABASE_URL!,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
    BASE_URL: process.env.BASE_URL || "http://localhost:4000",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};