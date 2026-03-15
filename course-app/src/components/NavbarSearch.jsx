import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";


export default function NavbarSearch({ fullWidth, className = "" }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      if (!query) {
        setResult([]);
      }
      try {
        const res = await api.get(`/search?q=${query}`);
        setResult(res.data.courses);
      } catch (e) {
        console.log("searching-courses-error", e);
      }
    };

    const delayDebounce = setTimeout(fetchResult, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className={`relative ${fullWidth ? "flex-1 min-w-0" : ""} ${className}`}>
      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`px-2 sm:px-4 py-2 rounded-lg outline-none border-none ${fullWidth ? "w-full" : "w-48 sm:w-64"}`}
      />

      {result.length > 0 && (
        <div className="absolute top-12 w-full bg-white text-black rounded-xl shadow-xl overflow-hidden z-50">
          {result.map((course) => (
            <div
              key={course._id}
              onClick={() => {
                navigate(`/course/${course._id}`);
                setQuery("");
                setResult([]);
              }}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-12 h-12 object-cover rounded"
              />

              <span className="font-medium">
                {course.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}