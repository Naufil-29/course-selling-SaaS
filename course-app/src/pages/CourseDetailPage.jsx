import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await api.get(`/users/course/${courseId}`);
        const data = res.data.course;
        setCourse(data);
      } catch (e) {
        console.log("error-fetching-course", e);
      }
    }
    fetchCourse();
  }, [courseId]);

  const handleBuy = async (id) => {
    const { data } = await api.post("/payment/create-checkout-session", {
      courseId: id,
    });
    window.location.href = data.url;
  };

  function convertToEmbed(url) {
    if (!url) return null;
    const cleanUrl = url.replace(/"/g, "").trim();
    if (cleanUrl.includes("embed")) return cleanUrl;
    if (cleanUrl.includes("watch?v=")) {
      const videoId = cleanUrl.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-200 text-black p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center overflow-x-hidden min-w-0">
      <div className="w-full max-w-4xl mx-auto bg-gray-300 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg flex flex-col gap-6 md:gap-10">
        {course.video ? (
          <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden bg-black" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={convertToEmbed(course.video)}
              title="Course Video"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl md:rounded-2xl"
            />
          </div>
        ) : (
          <img
            src={course.image}
            alt={course.title}
            className="w-full rounded-lg md:rounded-xl object-cover max-h-[240px] sm:max-h-[320px] md:max-h-[400px]"
          />
        )}

        <h1 className="text-2xl sm:text-3xl font-bold mt-2 md:mt-6">
          {course.title}
        </h1>

        <p className="mt-2 md:mt-4 text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          {course.desc}
        </p>

        {!course.video && (
          <button
            type="button"
            onClick={() => handleBuy(course._id)}
            className="bg-blue-500 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold w-full sm:w-auto min-h-[44px]"
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
}
