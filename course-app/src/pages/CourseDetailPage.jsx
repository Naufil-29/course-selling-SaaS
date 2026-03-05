import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { loadStripe } from "@stripe/stripe-js";

export default function CourseDetailPage() { 
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => { 
       async function fetchCourse() { 
         try{ 
            const res = await api.get(`/users/course/${courseId}`);
            const data = res.data.course
           setCourse(data);
           console.log("videUrl from backend", data.video);
         }
         catch(e){ 
            console.log("error-fetching-course", e);
         }
        }

        fetchCourse()
    }, [courseId]);

    const stripePromise = loadStripe("pk_test_51T6TEt1RChApmdbg5UF1tJBCU0WYFKSfSz6K8EcAkBNTyqToGkLyDCr8Ge46OeJzd5KVqSGejdVCNNgM7i0DRsXr00lrnJqxHh") // publishable key

    const handleBuy = async (courseId) => { 
      const stripe = await stripePromise;

      const { data } = await api.post("/payment/create-checkout-session", { 
         courseId
       });
        window.location.href = data.url;
      };

     

    
    function convertToEmbed(url) {
  if (!url) return null;

  // remove accidental quotes
  const cleanUrl = url.replace(/"/g, "").trim();

  if (cleanUrl.includes("embed")) {
    return cleanUrl;
  }

  if (cleanUrl.includes("watch?v=")) {
    const videoId = cleanUrl.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return null;
}

    if (!course) return <div>Loading...</div>;

    return<div className="min-h-screen w-screen  text-white p-10 flex items-center justify-center">
      <div className="max-w-4xl h-250 mx-auto bg-gray-300 text-black rounded-2xl p-8 shadow-lg flex flex-col gap-10">
        
        {course.video ? ( 
          <div className="relative pb-['56.5%'] h-100"> 
            <iframe
            src={convertToEmbed(course.video)}
            title="Course Video"
            allowFullScreen
            style={{ 
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "20px",
            }} 
            />   
        </div>) : ( 
          <img
            src={course.image}
            alt={course.title}
            className="w-full rounded-lg"
          />
        )}

        <h1 className="text-3xl font-bold mt-6">
          {course.title}
        </h1>

        <p className="mt-4 text-xl font-semibold">
          {course.desc}
        </p>

        {!course.video && ( 
          <button onClick={() => handleBuy(course._id)} className="bg-blue-500 text-white px-4 py-4 rounded-2xl text-xl font-semibold">
          Buy Now</button>
        )}

      </div>
    </div>
}