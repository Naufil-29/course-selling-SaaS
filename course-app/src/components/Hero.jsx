import img from "../assets/hero-img.webp";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Section 1: Master Full Stack + image */}
      <div className="section-1 flex flex-col pt-10 md:flex-row items-center justify-between gap-8 mt-16 mx-4 mb-10 md:mt-20 md:mx-8 md:mb-12 lg:mt-24 lg:ml-24 lg:mr-24 lg:mb-16">
        <div className="Info-section flex flex-col items-start justify-center gap-3 order-2 md:order-1 w-full md:w-auto">
          <div className="flex items-center justify-center gap-1 border-dotted border-2 w-full max-w-xs rounded-2xl px-3 py-2">
            <div className="w-3 h-3 rounded-full border-none bg-green-600 flex-shrink-0" />
            <p className="text-sm md:text-base">Join 100,000+ enrolled students today</p>
          </div>
          <div className="heading text-blue-900 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold">
            <h1>Master Full Stack</h1>
            <h1>Development</h1>
          </div>
          <div className="para text-gray-600 text-sm md:text-base max-w-xl">
            <p>Master Full Stack Development through hands-on open source projects. Join a community of developers transforming their careers with practical, real-world programming skills.</p>
          </div>
          <div className="btns flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
            <button className="px-5 py-3 rounded-xl bg-white border border-gray-300 text-black text-sm md:text-base hover:bg-gray-50">
              Learn More
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="px-5 py-3 rounded-xl bg-blue-900 border border-gray-300 text-white text-sm md:text-base hover:bg-blue-800"
            >
              Explore Courses
            </button>
          </div>
        </div>
        <div className="img-section order-1 md:order-2 w-full flex justify-center md:justify-end">
          <img
            className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:w-[560px] lg:max-w-none"
            src={img}
            alt="Full stack development"
          />
        </div>
      </div>

      {/* Section 2: Stats bar + two cards */}
      <div className="section-2 flex items-center justify-center">
        <div className="w-full bg-gray-100 py-8 md:py-12 lg:py-16 flex flex-col items-center gap-8 md:gap-12">
          {/* Stats Bar */}
          <div className="w-[92%] md:w-[90%] lg:w-[85%] bg-[#0b2161] text-white flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 px-6 py-8 md:px-10 lg:px-16 md:py-10 rounded-2xl md:rounded-3xl md:rounded-tr-[80px] lg:rounded-tr-[120px]">
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-start">
              <div className="bg-indigo-300/30 p-3 md:p-4 rounded-xl flex-shrink-0">
                <User className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">27</h2>
                <p className="text-gray-300 text-sm md:text-base">Students cracked GSoC 2025</p>
              </div>
            </div>
            <div className="hidden md:block h-12 lg:h-16 w-px bg-gray-400/40 flex-shrink-0" />
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-start">
              <div className="bg-indigo-300/30 p-3 md:p-4 rounded-xl flex-shrink-0 text-xl md:text-2xl">
                🏆
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">$150K</h2>
                <p className="text-gray-300 text-sm md:text-base">Highest International package</p>
              </div>
            </div>
            <div className="hidden md:block h-12 lg:h-16 w-px bg-gray-400/40 flex-shrink-0" />
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-start">
              <div className="bg-indigo-300/30 p-3 md:p-4 rounded-xl flex-shrink-0 text-xl md:text-2xl">
                🎁
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">200+</h2>
                <p className="text-gray-300 text-sm md:text-base">High paying internships confirmed</p>
              </div>
            </div>
          </div>

          {/* Bottom Two Cards */}
          <div className="w-[92%] md:w-[90%] lg:w-[85%] flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-1 bg-teal-500 text-white p-5 md:p-6 lg:p-7 rounded-2xl md:rounded-3xl md:rounded-br-[80px] lg:rounded-br-[120px]">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                Job ready skills that matter
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8">
                Master development through real-world applications, not tutorials
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {[
                  "Full Stack Development",
                  "Real-World Projects",
                  "Open Source Contributions",
                  "Production Ready",
                  "DevOps & Deployment",
                  "Job Ready Portfolio",
                ].map((item, index) => (
                  <span
                    key={index}
                    className="bg-white text-teal-600 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-[#0b2161] text-white p-5 md:p-6 lg:p-8 lg:pl-10 rounded-2xl md:rounded-3xl md:rounded-tl-[80px] lg:rounded-tl-[120px]">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-snug">
                Personally mentoring <br className="hidden sm:inline" /> India&apos;s next 100x engineers
              </h2>
              <p className="text-base md:text-lg text-white/80">
                Taking you from 1x to 100x through practical projects and real-world open source
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
