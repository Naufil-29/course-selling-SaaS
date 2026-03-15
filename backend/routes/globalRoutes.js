import express from "express";
import { healthCheckUp, logout, refresh, searchCourses } from "../controllers/globalControllers.js";

const globalRoutes = express.Router();

globalRoutes.post("/refresh", refresh);
globalRoutes.post("/logout", logout);
globalRoutes.get("/search", searchCourses);
globalRoutes.get("/health", healthCheckUp);

export default globalRoutes;