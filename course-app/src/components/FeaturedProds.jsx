import webdev from "../assets/webdev.jpg";
import web3 from "../assets/web3.jpg";
import combined from "../assets/combined.jpg";

const courses = [
  {
    title: "100xSchool Combined Bootcamp",
    desc: "Web dev (Every Friday) Devops (Every Friday) Machine Learning and AI (Every Saturday)",
    price: "₹5,999",
    oldPrice: "₹8,999",
    image: combined,
  },
  {
    title: "Web Dev + Devops Bootcamp",
    desc: "Web dev Devops",
    price: "₹4,989",
    oldPrice: "₹5,999",
    image: webdev,
  },
  {
    title: "Web3 Bootcamp",
    desc: "Complete Solana and Web3 Bootcamp",
    price: "₹3,999",
    oldPrice: "₹5,999",
    image: web3,
  },
];

export default function FeaturedCohorts() {
  return (
    <div className="bg-[#0B1F5E] py-20 px-10">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-white mb-12">
        Featured Cohorts
      </h2>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
          >
            {/* Image */}
            <img
                
              src={course.image}
              alt={course.title}
              className="h-62 w-full object-fill p-5"
            />

            {/* Content */}
            <div className="p-6 flex flex-col grow">
              <h3 className="text-lg font-semibold mb-3">
                {course.title}
              </h3>

              <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                {course.desc}
              </p>

              {/* Price Section */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-black">
                  {course.price}
                </span>
                <span className="text-gray-400 line-through">
                  {course.oldPrice}
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                  34% off
                </span>
              </div>

              {/* Currency Dropdown */}
              <select className="border rounded-xl border-gray-300 p-2 mb-4 text-sm">
                <option>INR</option>
                <option>USD</option>
              </select>

              {/* Button */}
              <button onClick={() => window.location.href = "/courses"} className="bg-[#0B1F5E] text-white py-3 rounded-xl font-medium hover:opacity-90 transition mt-auto">
                view Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}