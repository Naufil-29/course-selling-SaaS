import mongoose from 'mongoose';
const { Schema } = mongoose

import { string, z } from 'zod'
// import dotenv from 'dotenv';
// dotenv.config()

// mongoose.connect(process.env.MONGO_URI)
// .then(() => { 
//     console.log('successfully connected to database')
// });

export const adminSchema = new mongoose.Schema({ 
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
    type: String,
    default: "admin"
    },
    refreshToken: { 
        type: String
    },
    courses: []
});

const userSchema = new mongoose.Schema({ 
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
    type: String,
    default: "user"
    },
    refreshToken: { 
        type: String
    },
    purchasedCourses: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const courseSchema = new mongoose.Schema({ 
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId },
    adminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    image: { type: String },
    discount: { type: Number },
    desc: { type: String, default: "" },
    video : { 
        type: String,
        required: false
    }
});

export const AdminModel = mongoose.model("Admin", adminSchema);
export const UserModel = mongoose.model("User", userSchema);
export const CourseModel = mongoose.model("Course", courseSchema);