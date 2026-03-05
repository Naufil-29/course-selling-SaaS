import Button from "./Button"
import img from "../assets/hero-img.webp"
import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"
export default function Hero(){ 
    const navigate = useNavigate();
    return<div>
        <div className="section-1 flex items-center justify-between mt-25 ml-25 mr-25 mb-15"> 
        <div className="Info-section  flex flex-col items-start justify-center gap-3"> 
            <div className="flex items-center justify-center gap-1 border-dotted border-2 w-80 rounded-2xl"> 
                <div className="w-3 h-3 rounded-full border-none bg-green-600"></div>
                <p>Join 100,000+ enrolled students today</p>
            </div>
            <div className="heading text-blue-900 text-7xl font-semibold"> 
                <h1>Master Full Stack</h1>
                <h1>Development</h1>
            </div>
            <div className="para text-gray-600"> 
                <p>Master Full Stack Development through hands-on open source projects. Join a</p>
                <p>community of developers transforming their careers with practical, real-world</p>
                <p>programming skills</p>
            </div>
            <div className="btns flex items-center justify-center gap-5"> 
                <button className="px-6 py-3 rounded-xl bg-white border border-gray-300 text-black">Learn More</button>
                <button onClick={() => navigate("/courses")} className="px-6 py-3 rounded-xl bg-blue-900 border border-gray-300 text-white">Explore Courses</button>
            </div>
        </div>
        <div className="img-section "> 
            <img className="w-140" src={img}/>
        </div>
    </div>

    <div className="section-2 flex items-center justify-center"> 
        <div className="w-full bg-gray-100 py-16 flex flex-col items-center gap-12">

      {/* 🔵 Top Stats Bar */}
      <div className="w-[85%] bg-[#0b2161] text-white flex justify-between items-center px-16 py-10 rounded-3xl rounded-tr-[120px]">

        {/* Stat 1 */}
        <div className="flex items-center gap-6">
          <div className="bg-indigo-300/30 p-4 rounded-xl">
            <User/>
          </div>
          <div>
            <h2 className="text-4xl font-bold">27</h2>
            <p className="text-gray-300">Students cracked GSoC 2025</p>
          </div>
        </div>

        <div className="h-16 w-px bg-gray-400/40"></div>

        {/* Stat 2 */}
        <div className="flex items-center gap-6">
          <div className="bg-indigo-300/30 p-4 rounded-xl">
            🏆
          </div>
          <div>
            <h2 className="text-4xl font-bold">$150K</h2>
            <p className="text-gray-300">Highest International package</p>
          </div>
        </div>

        <div className="h-16 w-px bg-gray-400/40"></div>

        {/* Stat 3 */}
        <div className="flex items-center gap-6">
          <div className="bg-indigo-300/30 p-4 rounded-xl">
            🎁
          </div>
          <div>
            <h2 className="text-4xl font-bold">200+</h2>
            <p className="text-gray-300">High paying internships confirmed</p>
          </div>
        </div>

      </div>


      {/* 🟢 Bottom Two Cards */}
      <div className="w-[85%] flex gap-8">

        {/* Left Card */}
        <div className="flex-1 bg-teal-500 text-white p-7 rounded-3xl rounded-br-[120px]">
          <h2 className="text-4xl font-bold mb-4">
            Job ready skills that matter
          </h2>

          <p className="text-lg text-white/90 mb-8">
            Master development through real-world applications, not tutorials
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "Full Stack Development",
              "Real-World Projects",
              "Open Source Contributions",
              "Production Ready",
              "DevOps & Deployment",
              "Job Ready Portfolio"
            ].map((item, index) => (
              <span
                key={index}
                className="bg-white text-teal-600 px-4 py-2 rounded-full text-sm font-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div className="flex-1 pl-10 bg-[#0b2161] text-white p-8 rounded-3xl rounded-tl-[120px]">
          <h2 className="text-4xl font-bold mb-4 leading-snug">
            Personally mentoring <br /> India's next 100x engineers
          </h2>

          <p className="text-lg text-white/80">
            Taking you from 1x to 100x through practical projects
            and real-world open source
          </p>
        </div>

      </div>
    </div>
  
    </div>
 </div>
}