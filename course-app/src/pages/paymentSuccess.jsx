import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const verify = async () => { 
      try{ 
        const res = await api.post("/payment/verify-payment",{ 
          sessionId
        });

        setCourse(res.data.course);
      }
      catch(e){ 
        console.log("error-in-sending-verify-req", e)
      }
      finally{ 
        setLoading(false);
      }
    }

    if (sessionId) {
      verify()
    }
  }, [sessionId]);

  if(loading){ 
    return( 
      <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white text-2xl">
        Processing your payment...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center py-16 px-4">
      
      {/* Success Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        🎉 Payment Successful!
      </h1>

      <p className="text-lg text-blue-200 mb-10 text-center">
        Congratulations! You have successfully purchased{" "}
        <span className="font-semibold text-white">
          {course?.title}
        </span>
      </p>

      {/* Course Card */}
      <div className="p-5 bg-white text-black rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform hover:scale-105 transition duration-300">
        
        <img
          src={course?.image}
          alt={course?.title}
          className="w-full h-56 object-cover rounded-2xl"
        />

        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">
            {course?.title}
          </h2>

          <p className="text-gray-600 mb-4">
            {course?.description}
          </p>

          <p className="font-semibold text-lg mb-4">
            ₹ {course?.price}
          </p>

          <button onClick={() => navigate(`/course/${course._id}`)} className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition">
            Start Learning 🚀
          </button>
        </div>
      </div>
        <button className="mt-20 px-20 py-3 rounded-2xl text-xl font-bold bg-red-600 overflow-hidden transform hover:scale-105 transition duration-300" 
        onClick={() => window.location.href = "/courses"}>Back To Home</button>
    </div>
  );
};
