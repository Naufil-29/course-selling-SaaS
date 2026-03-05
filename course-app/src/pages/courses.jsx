import { loadStripe } from "@stripe/stripe-js";
import { Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useState, useEffect } from "react";
import SignIn from "../components/Signin";
import SignUp from "../components/Signup";
import bannerImg from "../assets/banner.webp";
import webdevImg from "../assets/webdev.jpg";
import web3Img from "../assets/web3.jpg";
import combinetImg from "../assets/combined.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavbarSearch from "../components/NavbarSearch";

export default function CoursesPage() {

    const coursesBYFE = [
    {
      title: "Complete Web Development + Devops + Blockchain Cohort",
      desc: "Complete syllabus - https://blog.100xdevs.com/ Starts 2nd August 2024 In the Web Development...",
      price: "₹5,989",
      oldPrice: "₹8,499",
      discount: "30% off",
      image: `${combinetImg}`
    },
    {
      title: "Complete Web development + Devops Cohort",
      desc: "Starts 2nd August 2024 Complete syllabus - https://blog.100xdevs.com/",
      price: "₹4,989",
      oldPrice: "₹5,999",
      discount: "17% off",
      image: `${webdevImg}`
    },
    {
      title: "Complete Web3/Blockchain Cohort",
      desc: "Complete syllabus - https://blog.100xdevs.com/ Starts 2nd August 2024 Web3 Basics...",
      price: "₹4,989",
      oldPrice: "₹5,999",
      discount: "17% off",
      image: `${web3Img}`
    },
    {
      title: "Complete Web Development + Devops + Blockchain Cohort",
      desc: "Complete syllabus - https://blog.100xdevs.com/ Starts 2nd August 2024 In the Web Development...",
      price: "₹5,989",
      oldPrice: "₹8,499",
      discount: "30% off",
      image: `${combinetImg}`
    },
    {
      title: "Complete Web development + Devops Cohort",
      desc: "Starts 2nd August 2024 Complete syllabus - https://blog.100xdevs.com/",
      price: "₹4,989",
      oldPrice: "₹5,999",
      discount: "17% off",
      image: `${webdevImg}`
    },
    {
      title: "Complete Web3/Blockchain Cohort",
      desc: "Complete syllabus - https://blog.100xdevs.com/ Starts 2nd August 2024 Web3 Basics...",
      price: "₹4,989",
      oldPrice: "₹5,999",
      discount: "17% off",
      image: `${web3Img}`
    }
  ];

        const [showSignup, setShowSignup] = useState(false);
        const [showSignin, setShowSignin] = useState(false);
        const [userInitial, setUserInitial] = useState(null);
        const [courses, setCourses] = useState(coursesBYFE);
        const navigate = useNavigate()
        const token = localStorage.getItem('accessToken');
    
        useEffect(() => { 
            const storedUser = localStorage.getItem('user');
            if(storedUser){ 
                const user = JSON.parse(storedUser);
                const firstChar = user.username[0].toUpperCase();
                setUserInitial(firstChar);
            }
            getAllCourses()
        },[]);

        const getAllCourses = async() => { 
            const response = await api.get("/users/courses");
            setCourses(response.data.updatedCourses)
        };

        const stripePromise = loadStripe("pk_test_51T6TEt1RChApmdbg5UF1tJBCU0WYFKSfSz6K8EcAkBNTyqToGkLyDCr8Ge46OeJzd5KVqSGejdVCNNgM7i0DRsXr00lrnJqxHh") // publishable key

        const handleBuy = async (courseId) => { 
          const stripe = await stripePromise;

          const { data } = await api.post("/payment/create-checkout-session", { 
            courseId
          });
          window.location.href = data.url;
          await getAllCourses();
        };


  return (
    <div className="w-full">
        <div className="">
            <Navbar openSignup={() => setShowSignup(true)} openSignin={() => setShowSignin(true)} userInitial={userInitial} setUserInitial={setUserInitial}/>
        </div>
        {showSignup && ( 
            <SignUp openSignin={() => setShowSignin(true)} closeSignup={() => setShowSignup(false)}/>
        )}
        {showSignin && ( 
            <SignIn closeSignin={() => setShowSignin(false)} setUserInitial={setUserInitial}/>
        )}

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[80vh]">

        {/* Background Image */}
        <img
          src={bannerImg}
          alt="Hero"
          className="absolute w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-xxs"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5 text-white">
          <p className="text-sm mb-3">Mentored by Harkirat Singh</p>

          <h1 className="text-5xl font-bold mb-5">
            Choose Your Learning Path
          </h1>

          <p className="max-w-3xl text-lg mb-8 text-gray-200">
            Master real engineering skills with hands-on mentorship. From full-stack
            development to DevOps — get job-ready with structured,
            industry-focused programs.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl bg-white rounded-full flex items-center px-5 py-3 shadow-lg text-black">
            <Search className="text-black mr-3 border-0" />
            <NavbarSearch
              type="text"
              
            />
          </div>
        </div>
      </div>

      {/* ================= COURSES GRID ================= */}
      <div className="bg-gray-100 py-16 px-10">

        <h2 className="text-3xl font-bold text-blue-900 mb-10">
         Featured Programs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <img
                src={course.image}
                alt={course.title}
                className="rounded-xl mb-4 w-full h-48 object-cover"
              />

              {/* Title */}
              <h3 className="font-semibold text-lg mb-2 text-blue-900">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {course.desc}
              </p>

              {/* Price Section */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-900">
                  ₹ {course.price}
                </span>
                <span className="line-through text-gray-400">
                  ₹ {course.oldPrice}
                </span>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                  {course.discount} % off
                </span>
              </div>

              {/* Currency Dropdown */}
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 outline-none">
                <option>INR</option>
                <option>USD</option>
              </select>

              {/* Button */}
              {course.isPurchased ? ( 
                <button onClick={() => navigate(`/course/${course._id}`)}
                  className="mt-4 bg-green-600 text-white w-full py-3 rounded-lg">
                    View Content
                </button>
              ) : ( 
                <button onClick={() => handleBuy(course._id)}
                  className="mt-4 bg-blue-600 text-white px-4 w-full py-3 rounded-lg">
                  Buy Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div> 
        <Footer/>
      </div>
    </div>
  );
}