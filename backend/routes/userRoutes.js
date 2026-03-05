import express from "express";
import { userAuth } from "../Middlewares/Middlewares.js";
import { authRateLimiter, payRateLimiter } from "../Middlewares/rateLimiters.js";
import { getAllCourses, getOneCourse, purchasedCourses, userPurchase, userSignin, userSignup } from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.post("/signup", authRateLimiter, userSignup);
userRoutes.post("/signin", authRateLimiter, userSignin);
userRoutes.get("/courses", userAuth, getAllCourses);
userRoutes.post("/course/:courseId", userAuth, payRateLimiter, userPurchase);
userRoutes.get("/purchasedcourses", userAuth, purchasedCourses);
userRoutes.get("/course/:courseId", userAuth, getOneCourse);

export default userRoutes;