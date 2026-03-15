import jwt from "jsonwebtoken";
import { UserModel, AdminModel, CourseModel } from "../Models/models.js";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const refresh =  async(req, res) => { 
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){ 
        return res.status(401).json({ message: "No refresh token" });
    }

    try{ 
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

        let user = await UserModel.findById(decoded.id);
        let role = "user";

        if(!user){ 
            user = await AdminModel.findById(decoded.id);
            role = "admin"
        }

        if(!user || user.refreshToken !== refreshToken){ 
            return res.status(401).json({ message: "No refresh token" });
        }

        const newAccessToken = jwt.sign({ 
            id: user._id, role
        }, JWT_ACCESS_SECRET,
          {expiresIn: "15m"});

        res.status(201).json({ 
            Msg: "new access token created",
            newAccessToken
        })
    }
    catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expired" });
    }

    return res.status(401).json({ message: "Invalid refresh token" })
  }
};


export const logout =  async (req, res) => {

  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const user = await UserModel.findOne({ refreshToken }) 
              || await AdminModel.findOne({ refreshToken });

    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};

export const searchCourses = async (req, res) => { 
  try{ 
    const { q } = req.query;

    if(!q){ 
      return res.json({ courses: [] });
    }

    const courses = await CourseModel.find({ 
      title: { $regex: q, $options: "i" } // case insensitive search
    }).limit(5);  // limit result for drop down

    res.json({ courses });
  }
  catch(e){ 
    console.log("serch-error", e);
    return res.status(500).json({ Msg:"error-searching-courses" })
  }
};

export const healthCheckUp = (req, res) => { 
  try{ 
    res.status(200).json({Msg: "server is awake and alright"})
  }
  catch(e){ 
    res.status(500).json({Msg: "error sending response"})
  }
};
