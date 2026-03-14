import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";
import { AdminModel, CourseModel } from "../Models/models.js";
import { adminSignupSchema, adminSigninSchema } from "../validations/adminValidations.js";
import { courseZodSchema } from "../validations/courseValidations.js";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;


export const adminSignup = async(req, res) => { 
    try{ 
    const result = adminSignupSchema.safeParse(req.body);

    if(!result.success){ 
        return res.status(400).json({ 
            Msg: 'Bad input or incorrect syntax'
        });
    }

    const { username, email, password  } = result.data;
    let saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = await AdminModel.create({ 
        username, email, password: hashedPassword
    });

    res.status(200).json({ 
        Msg: 'New admin created successfully',
        newAdmin
    });
    
    }
    catch(e){ 
        console.log('error creating new admin', e)
        res.status(500).json({ 
            Msg: 'error creating new adim'
        })
    }
};

export const adminSignin = async(req, res) => { 
    try{ 
    const result = adminSigninSchema.safeParse(req.body);

    if(!result.success){ 
        return res.status(400).json({ 
            Msg: "bad input or incorrect syntax"
        });
    }
    const ValidData = result.data;

    const { email, password } = result.data;

    const Admin = await AdminModel.findOne({email}).select("+password");

    const isMatch = await bcrypt.compare(password, Admin.password);

    if (!isMatch) {
        return res.status(401).json({
         Msg: "Invalid credentials"
        });
    }
    
    const existingAdmin = await AdminModel.findOne({ 
        email: ValidData.email
    });

    if(!existingAdmin){ 
        res.status(401).json({ 
            Msg: "Unauthorized! admin not found"
        })
    }

    const accessToken = jwt.sign({ 
        id: existingAdmin._id,
        role: existingAdmin.role
    }, JWT_ACCESS_SECRET, { expiresIn: "1d" });

    const refreshToken = jwt.sign({
        id: existingAdmin._id
    }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

    existingAdmin.refreshToken = refreshToken;
    await existingAdmin.save();

    res.cookie("refreshToken", refreshToken, { 
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    }).json({ Msg:"user signedIn successfully", accessToken })


    }
    catch(e){ 
        console.log('error singing-In admin', e)
        res.status(500).json({ 
            Msg: 'error signing-in as admin'
        })
    }
};

export const createCourse = async(req, res) => {
    try{ 
        const result = courseZodSchema.safeParse(req.body);

    if(!result.success){ 
        return res.status(400).json({ 
            Msg: "bad input or incorrect syntax"
        });
    };

    const ValidData = result.data;

    const newCourse = await CourseModel.create({ 
        adminId: req.adminId,
        title: ValidData.title,
        price: ValidData.price,
        oldPrice: ValidData.oldPrice,
        discount: ValidData.discount,
        image: ValidData.image,
        desc: ValidData.desc,
        video: ValidData.video,
        creator: req.adminId
    });

    res.status(201).json({ 
        Msg: 'course created successfully',
        newCourse
    });
    }
    catch(e){ 
        console.log('course-error', e)
        res.status(500).json({ 
            Msg: 'error creating new course'
        })
    }
};

export const updateCourse = async(req, res) => { 
    try{
            const courseId = req.params.courseId;
            console.log(courseId)
            const course = await CourseModel.findById(courseId);

            if(!course){ 
                return res.status(404).json({ 
                    Msg: 'course not found'
                });
            }
            if(course.adminId.toString() !== req.adminId){ 
                console.log(course.adminId.toString(), req.adminId)
                 return res.status(401).json({ 
                 Msg: 'you are not authorized to change this course'
                });
            }

            const updatedCourse = await CourseModel.findOneAndUpdate(
                { 
                _id: courseId,
                 adminId: req.adminId
                 },
                 req.body,
                { returnDocument: "after" }
            );

            res.status(200).json({ 
            Msg: 'course updated successfully',
            updatedCourse
            });
        }
    catch(e){ 
        console.log('updating-course-err', e)
         res.status(500).json({ 
            Msg: 'error updating course'
         })
    }
};

export const deleteCourse = async(req, res) => { 
    try{ 
        const courseId = req.params.courseId;

        const course = await CourseModel.findById(courseId);

        if(!course){ 
            return res.status(404).json({ 
                Msg: 'no such course found'
            })
        }
        console.log(course.adminId.toString(), req.adminId)

        if(course.adminId.toString() !== req.adminId){ 
            return res.status(401).json({ 
                Msg: 'you are not authorized to delete this course'
            })
        }

        const deletedCourse = await CourseModel.findByIdAndDelete( 
            { 
                _id: courseId,
                adminId: req.adminId
            }, 
        );

        res.status(200).json({ 
            Msg: 'course deleted successfully',
            deletedCourse
        });
    }
    catch(e){ 
        console.log('error deleting-course', e);
        return res.status(500).json({ 
            Msg: 'error deleting course'
        });
    }
};

export const adminCourses = async (req, res) => {
  try {
    const coursesByAdmin = await CourseModel.find({
      adminId: req.adminId
    });

    res.status(200).json({
      msg: "All courses created by you",
      courses: coursesByAdmin
    });

  } catch (err) {
    res.status(500).json({
      msg: "Error fetching courses",
      error: err.message
    });
  }
};

export const allCourses = async(req, res) => { 
    try{ 
        const allCourses = await CourseModel.find();

        res.status(201).json({ 
            Msg: 'all courses',
            courses: allCourses
        });
    }
    catch(e){ 
        console.log('get-all-course-error', e)
        res.status(500).json({ 
            Msg: 'error finding all courses'
        })
    }
};