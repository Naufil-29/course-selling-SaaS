// rateLimiter.js
import dotenv from "dotenv";
dotenv.config();
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "../utils/redisClient.js";

 const globalLimit = new Ratelimit({ 
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true
});

const authLimit = new Ratelimit({ 
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true
});

const payLimit = new Ratelimit({ 
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true
});

export const globalRateLimiter = async (req, res, next) => { 
  const ip = req.ip || req.headers["x-forwarded-for"] || "anonymous";
  const { success } = await globalLimit.limit(ip);
  // console.log(success)

  if(!success){ 
    return res.status(429).json({
      message: "Too many requests. Please try again later."
    });
  }

  next()
};

export const authRateLimiter = async (req, res, next) => { 
  const ip = req.ip || req.headers["x-forwarded-for"] || "anonymous";
  const { success, limit, remaining } = await authLimit.limit(ip);
  console.log("limit ", limit)
  console.log("remaining ", remaining)

  if(!success){ 
    return res.status(429).json({ 
      Msg: "Too many requests. Please try again later"
    })
  }

  next()
};

export const payRateLimiter = async (req, res, next) => { 
  const ip = req.ip || req.headers["x-forwarded-for"] || "anonymous";
  const { success } = await payLimit.limit(ip);

  if(!success){ 
    return res.status(429).json({ 
      Msg: "Too many requests. Please try again later"
    })
  }

  next()
};