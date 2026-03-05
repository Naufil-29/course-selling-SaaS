import express from "express";
import { userAuth } from "../Middlewares/Middlewares.js";
import { createChekcoutSession, verifyPayment } from "../controllers/paymentControllers.js";
const paymentRoutes = express.Router();

paymentRoutes.post("/create-checkout-session", userAuth, createChekcoutSession);
paymentRoutes.post("/verify-payment", userAuth, verifyPayment);

export default paymentRoutes;