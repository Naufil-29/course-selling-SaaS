import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';


export function adminAuth(req, res, next) { 
    try{
      console.log(req.adminId); 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        code: "NO_TOKEN",
        message: "Access token missing",
      });
    }

    const token = authHeader.split(" ")[1]; // ✅ extract real token

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    req.adminId = decoded.id;
    next();
  } catch (e) {
    console.log("error verifying user", e);

    if (e.name === "TokenExpiredError") {  // ⚠️ also fixed spelling
      return res.status(401).json({
        code: "TOKEN_EXPIRED",
        message: "Access token expired",
      });
    }

    if(e.name === "jwt malformed"){ 
        return res.status(401).json({
        code: "jwt malformed",
        message: "jwt malformed",
      });
    }

    return res.status(401).json({
      code: "INVALID_TOKEN",
      message: "Invalid access token",
    });
    }
}

export function userAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        code: "NO_TOKEN",
        message: "Access token missing",
      });
    }

    const token = authHeader.split(" ")[1]; // ✅ extract real token

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    req.userId = decoded.id;
    next();
  } catch (e) {
    console.log("error verifying user", e);

    if (e.name === "TokenExpiredError") {  // ⚠️ also fixed spelling
      return res.status(401).json({
        code: "TOKEN_EXPIRED",
        message: "Access token expired",
      });
    }

    if(e.name === "jwt malformed"){ 
        return res.status(401).json({
        code: "jwt malformed",
        message: "jwt malformed",
      });
    }

    return res.status(401).json({
      code: "INVALID_TOKEN",
      message: "Invalid access token",
    });
  }
}