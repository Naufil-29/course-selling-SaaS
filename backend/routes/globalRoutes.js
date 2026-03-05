import express from "express";
import { logout, refresh, searchCourses } from "../controllers/globalControllers.js";

const globalRoutes = express.Router();

globalRoutes.post("/refresh", refresh);
globalRoutes.post("/logout", logout);
globalRoutes.get("/search", searchCourses);

export default globalRoutes;