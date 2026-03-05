import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carsoul() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const intervalRef = useRef(null);

  const cards = [
    {
      title: "Real Engineer, Real Experience",
      desc: "Learn from engineers who built & scaled real-world systems."
    },
    {
      title: "Learn by Doing",
      desc: "Hands-on projects, open-source & practical coding."
    },
    {
      title: "Job-Ready Curriculum",
      desc: "Master DSA, System Design, DevOps & full-stack skills."
    },
    {
      title: "Mock Interviews",
      desc: "Prepare with real interview simulations."
    },
    {
      title: "Open Source Focus",
      desc: "Contribute & build your public developer profile."
    },
    {
      title: "Placement Support",
      desc: "Structured roadmap to land high paying roles."
    }
  ];

   const cardWidth = 420; // 380 card + 40 margin

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 2000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? cards.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full bg-gray-100 py-20">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-blue-900">
          Why 100xDevs?
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Our most comprehensive and impactful learning experiences
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative w-full overflow-hidden">

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-10 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white p-3 rounded-full"
        >
          <ChevronLeft />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-10 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white p-3 rounded-full"
        >
          <ChevronRight />
        </button>

        {/* Track */}
        <div className="flex justify-center">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(50% - ${
                currentIndex * cardWidth + cardWidth / 2
              }px))`
            }}
          >
            {cards.map((card, index) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={index}
                  className={`w-[380px] mx-5 shrink-0 rounded-3xl p-8 transition-all duration-500 shadow-lg
                    ${
                      isActive
                        ? "bg-indigo-900 text-white scale-105"
                        : "bg-white text-gray-700 opacity-70 scale-95"
                    }`}
                >
                  <h3 className="text-2xl font-semibold mb-4">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
            </div>
        </div>
      </div>
    </div>
  );
}