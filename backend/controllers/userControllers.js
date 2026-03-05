import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { UserModel, CourseModel } from "../Models/models.js";
import { userSignupSchema, userSigninSchema } from "../validations/userValidations.js";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const userSignup = async(req, res) => { 
    try{ 
        const result = userSignupSchema.safeParse(req.body);

        if(!result.success){ 
            return res.status(401).json({ 
            Msg: 'incorrect input or syntax error'
            })
        }
        const { username, email, password } = result.data;
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const existingUser = await UserModel.findOne({email});

        if(existingUser){ 
            return res.status(409).json({ Msg: "User already exists"})
        }

        const newUser = await UserModel.create({ 
            username, email, password: hashedPassword
        });

        res.status(200).json({ 
            Msg: 'new user created successfully',
            newUser
        });
    }
catch(e){ 
    console.log('error creating-new-user', e)
    return res.status(500).json({ 
        Msg: 'error creating new user'
    });
}};

export const userSignin = async(req, res) => {
    try{ 
        const result = userSigninSchema.safeParse(req.body);

        if(!result.success){ 
            return res.status(400).json({ 
            Msg: 'incorrect input or syntax error'
            });
        }

        const { email, password } = result.data;

            // 2️⃣ Find user
        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
            Msg: "Invalid email or password"
            });
        }

         const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
             Msg: "Invalid credentials"
            });
        }


        const validData = result.data;

        const existingUser = await UserModel.findOne({ 
            email: validData.email
        });

        if(!existingUser){ 
            return res.status(404).json({ 
            Msg: 'no such user found'
            });
        }

    const accessToken = jwt.sign({ 
        id: existingUser._id,
        role: existingUser.role
    }, JWT_ACCESS_SECRET, { expiresIn: "1d" });

    const refreshToken = jwt.sign({
        id: existingUser._id
    }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.cookie("refreshToken", refreshToken, { 
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    }).json({ Msg:"user signedIn successfully", accessToken, user:existingUser });


    }
    catch(e){ 
        console.log('user signing In error', e)
        return res.status(500).json({ 
            Msg: 'error logging in',
        });
    }
};

export const getAllCourses = async(req, res) => { 
    try{ 
        const allCourses = await CourseModel.find();
        const user = await UserModel.findById(req.userId);

        const updatedCourses = allCourses.map(allCourse => { 
            const isPurchased = user.purchasedCourses.some( 
                id => id.toString() === allCourse._id.toString()
            );
            return{ 
                ...allCourse.toObject(),
                isPurchased
            }
        })

        res.status(201).json({ 
            Msg: 'all courses',
             updatedCourses
        });
    }
    catch(e){ 
        console.log('get-all-course-error', e)
        res.status(500).json({ 
            Msg: 'error finding all courses'
        })
    }
};

export const userPurchase =  async (req, res) => { 
    try{ 
         const courseId = req.params.courseId;
         console.log(courseId)

        const course = await CourseModel.findOne({ 
            _id: courseId
        });

        if(!course){ 
            return res.status(404).json({ 
            Msg: 'selected course not found or deleted'
            })
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.userId }, 
            { $addToSet: { purchasedCourses: course._id } },
            { returnDocument: "after"}
        );

        res.status(200).json({ 
            Msg: 'congratulation you purchased a new course',
            updatedUser
        });
    }
    catch(e){ 
        console.log('purchasing-course-error', e);
        return res.status(500).json({ 
            Msg: 'error purchasing course'
        });
    }
};

export const purchasedCourses =  async(req, res) => {
    try{ 
        const userId = req.userId;
        console.log(userId);

        const user = await UserModel.findById(userId)
        .populate("purchasedCourses");

        if(!user){ 
            return res.status(404).json({ 
                Msg: 'user not found'
            })
        }

        res.status(200).json({ 
            Msg: "user's all courses",
            purchasedCourses: user.purchasedCourses
        });
    }
    catch(e){ 
        console.log('error-searching-courses-of-user', e);
        return res.status(500).json({ 
            Msg: 'error searching your courses'
        });
    }
};

export const getOneCourse = async(req, res) => { 
    try{ 
        const {courseId} = req.params;

        let course = await CourseModel.findById(courseId);
        const user = await UserModel.findById(req.userId);
        const hasPurchased = user.purchasedCourses.includes(courseId);

        if(!course){ 
        return res.status(404).json({Msg: "course not found"})
        }

        let courseData = course.toObject();

        if(!hasPurchased){ 
            courseData.video = null
        }

        course = courseData

        res.status(200).json({ Msg: "course found", course });
    }
    catch(e){ 
        console.log("error-fetching-Onecourse", e);
        return res.status(500).json({Msg: "error-fetching-Onecourse"})
    }
}