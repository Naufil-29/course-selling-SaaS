import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import globalRoutes from './routes/globalRoutes.js';
import paymentRoutes from './routes/paymentsRoutes.js'
import { globalRateLimiter } from './Middlewares/rateLimiters.js';

connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(globalRateLimiter);
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/", globalRoutes);
app.use("/payment", paymentRoutes);

app.listen(3000, console.log('app listening on port 3000'));