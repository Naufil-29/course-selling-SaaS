import express from "express";
import { adminAuth } from "../Middlewares/Middlewares.js";
import { adminSignup, adminSignin, createCourse, updateCourse, deleteCourse, allCourses, adminCourses } from "../controllers/adminControllers.js";

const adminRoutes = express.Router();

adminRoutes.post("/signup", adminSignup);
adminRoutes.post("/signin", adminSignin);
adminRoutes.post("/course", adminAuth, createCourse);
adminRoutes.put("/course/:courseId", adminAuth, updateCourse);
adminRoutes.delete("/course/:courseId", adminAuth, deleteCourse);
adminRoutes.get("/courses", adminAuth, allCourses);
adminRoutes.get("/mycourses", adminAuth, adminCourses);

export default adminRoutes;