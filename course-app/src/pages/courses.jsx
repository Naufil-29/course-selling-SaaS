import { loadStripe } from "@stripe/stripe-js";
import { Search } from "lucide-react";
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
      image: `${combinetImg}`,
    },
    {
      title: "Complete Web development + Devops Cohort",
      desc: "Starts 2nd August 2024 Complete syllabus - https://blog.100xdevs.com/",
      price: "₹4,989",
      oldPrice: "₹5,999",
      discount: "17% off",
      image: `${webdevImg}`,
    },
    {
      title: "Complete Web3/Blockchain Cohort",
      desc: "Complete syllabus - https://blog.100xdevs.com/ Starts 2nd August 2024 Web3 Basics...",
      price: "₹4,989",
      oldPrice: "₹5,999",
      discount: "17% off",
      image: `${web3Img}`,
    },
    {
      title: "Complete Web Development + Devops + Blockchain Cohort",
      desc: "Complete syllabus - https://blog.100xdevs.com/ Starts 2nd August 2024 In the Web Development...",
      price: "₹5,989",
      oldPrice: "₹8,499",
      discount: "30% off",
      image: `${combinetImg}`,
    },
    {
      title: "Complete Web development + Devops Cohort",
      desc: "Starts 2nd August 2024 Complete syllabus - https://blog.100xdevs.com/",
      price: "₹4,989",
      oldPrice: "₹5,999",
      discount: "17% off",
      image: `${webdevImg}`,
    },
    {
      title: "Complete Web3/Blockchain Cohort",
      desc: "Complete syllabus - https://blog.100xdevs.com/ Starts 2nd August 2024 Web3 Basics...",
      price: "₹4,989",
      oldPrice: "₹5,999",
      discount: "17% off",
      image: `${web3Img}`,
    },
  ];

  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const [courses, setCourses] = useState(coursesBYFE);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const firstChar = user.username[0].toUpperCase();
      setUserInitial(firstChar);
    }
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    const response = await api.get("/users/courses");
    setCourses(response.data.updatedCourses);
  };

  const handleBuy = async (courseId) => {
    const { data } = await api.post("/payment/create-checkout-session", {
      courseId,
    });
    window.location.href = data.url;
    await getAllCourses();
  };

  return (
    <div className="w-full overflow-x-hidden min-w-0">
      <Navbar
        openSignup={() => setShowSignup(true)}
        openSignin={() => setShowSignin(true)}
        userInitial={userInitial}
        setUserInitial={setUserInitial}
      />
      {showSignup && (
        <SignUp
          openSignin={() => setShowSignin(true)}
          closeSignup={() => setShowSignup(false)}
        />
      )}
      {showSignin && (
        <SignIn
          closeSignin={() => setShowSignin(false)}
          setUserInitial={setUserInitial}
        />
      )}

      {/* Hero Section */}
      <div className="relative w-full min-h-[50vh] pt-10 sm:min-h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <img
          src={bannerImg}
          alt="Hero"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-5 py-8 text-white">
          <p className="text-xs sm:text-sm mb-2 md:mb-3">Mentored by Harkirat Singh</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-5">
            Choose Your Learning Path
          </h1>
          <p className="max-w-3xl text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-gray-200">
            Master real engineering skills with hands-on mentorship. From
            full-stack development to DevOps — get job-ready with structured,
            industry-focused programs.
          </p>
          <div className="w-full max-w-2xl bg-white rounded-full flex items-center px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg text-black">
            <Search className="text-black mr-2 sm:mr-3 border-0 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
            <NavbarSearch type="text" fullWidth />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="bg-gray-100 pt-20 py-10 px-4 sm:py-12 sm:px-6 md:py-14 md:px-8 lg:py-16 lg:px-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 md:mb-10">
          Featured Programs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {courses.map((course, index) => (
            <div
              key={course._id ?? index}
              className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="rounded-lg md:rounded-xl mb-3 md:mb-4 w-full h-40 sm:h-44 md:h-48 object-cover"
              />
              <h3 className="font-semibold text-base md:text-lg mb-2 text-blue-900 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-2">
                {course.desc}
              </p>
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
                <span className="text-lg md:text-xl font-bold text-blue-900">
                  ₹ {course.price}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹ {course.oldPrice}
                </span>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                  {course.discount} % off
                </span>
              </div>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 md:mb-4 outline-none text-sm">
                <option>INR</option>
                <option>USD</option>
              </select>
              {course.isPurchased ? (
                <button
                  type="button"
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="mt-2 md:mt-4 bg-green-600 text-white w-full py-2.5 sm:py-3 rounded-lg text-sm md:text-base font-medium min-h-[44px]"
                >
                  View Content
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleBuy(course._id)}
                  className="mt-2 md:mt-4 bg-blue-600 text-white w-full py-2.5 sm:py-3 rounded-lg text-sm md:text-base font-medium min-h-[44px]"
                >
                  Buy Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
