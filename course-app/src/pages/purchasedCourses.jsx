import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";

export default function PurchasedCourses(){ 
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInitial, setUserInitial] = useState(null);
    const [showSignup, setShowSignup] = useState(false);
    const [showSignin, setShowSignin] = useState(false);

     useEffect(() => { 
            const storedUser = localStorage.getItem('user');
            if(storedUser){ 
                const user = JSON.parse(storedUser);
                const firstChar = user.username[0].toUpperCase();
                setUserInitial(firstChar);
            }
        },[]);

    useEffect(() => { 
        const fetchPurchased = async () => { 
          try{ 
            const res = await api.get("/users/purchasedCourses");
            setCourses(res.data.purchasedCourses);
          }
          catch(e){ 
            console.log("error-fetching-purchasedCourses", e);
          }
          finally{ 
            setLoading(false)
          }
        };

        fetchPurchased()
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-blue-900 flex items-center justify-center text-white text-2xl">
                Loading your courses...
             </div>
    }

    return <div className="min-h-screen bg-blue-900 text-white py-40">
        <div className="fixed">
                   <Navbar openSignup={() => setShowSignup(true)} openSignin={() => setShowSignin(true)} userInitial={userInitial} setUserInitial={setUserInitial}/>
               </div>
               {showSignup && ( 
                   <SignUp openSignin={() => setShowSignin(true)} closeSignup={() => setShowSignup(false)}/>
               )}
               {showSignin && ( 
                   <SignIn closeSignin={() => setShowSignin(false)} setUserInitial={setUserInitial}/>
               )}

      <h1 className="text-4xl font-bold text-center mb-12">
        📚 Your Purchased Courses
      </h1>

      <div className="w-screen px-10"> 
              {courses.length === 0 ? (
        <p className="text-center text-blue-200">
          You haven't purchased any courses yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="p-4 bg-white text-black rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-2xl"
              />

              <div className="p-5">
                <h2 className="text-lg font-bold mb-2">
                  {course.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {course.description}
                </p>

                <button onClick={() => navigate(`/course/${course._id}`)} className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition">
                  Continue Learning 🚀
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

    </div>
}