import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import SignUp from "../components/Signup";
import SignIn from "../components/Signin";

export default function PurchasedCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInitial, setUserInitial] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const firstChar = user.username[0].toUpperCase();
      setUserInitial(firstChar);
    }
  }, []);

  useEffect(() => {
    const fetchPurchased = async () => {
      try {
        const res = await api.get("/users/purchasedCourses");
        setCourses(res.data.purchasedCourses);
      } catch (e) {
        console.log("error-fetching-purchasedCourses", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchased();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl px-4">
        Loading your courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white overflow-x-hidden min-w-0 pt-16 md:pt-20">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar
          openSignup={() => setShowSignup(true)}
          openSignin={() => setShowSignin(true)}
          userInitial={userInitial}
          setUserInitial={setUserInitial}
        />
      </div>

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

      <div className="py-10 sm:py-14 md:py-20 lg:py-28 px-4 sm:px-6 md:px-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
          📚 Your Purchased Courses
        </h1>

        <div className="w-full max-w-6xl mx-auto">
          {courses.length === 0 ? (
            <p className="text-center text-blue-200 text-base sm:text-lg">
              You haven&apos;t purchased any courses yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="p-4 bg-white text-black rounded-xl md:rounded-2xl shadow-2xl overflow-hidden transition duration-300"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-xl md:rounded-2xl"
                  />
                  <div className="p-4 sm:p-5">
                    <h2 className="text-base sm:text-lg font-bold mb-2 line-clamp-2">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                      {course.desc ?? course.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="w-full bg-blue-900 text-white py-2.5 sm:py-3 rounded-lg hover:bg-blue-800 transition font-medium min-h-[44px]"
                    >
                      Continue Learning 🚀
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
