import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carsoul() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [cardWidth, setCardWidth] = useState(300);
  const intervalRef = useRef(null);

  const cards = [
    {
      title: "Real Engineer, Real Experience",
      desc: "Learn from engineers who built & scaled real-world systems.",
    },
    {
      title: "Learn by Doing",
      desc: "Hands-on projects, open-source & practical coding.",
    },
    {
      title: "Job-Ready Curriculum",
      desc: "Master DSA, System Design, DevOps & full-stack skills.",
    },
    {
      title: "Mock Interviews",
      desc: "Prepare with real interview simulations.",
    },
    {
      title: "Open Source Focus",
      desc: "Contribute & build your public developer profile.",
    },
    {
      title: "Placement Support",
      desc: "Structured roadmap to land high paying roles.",
    },
  ];

  useEffect(() => {
    const updateCardWidth = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCardWidth(420);   // 380 + 40 margin
      else if (w >= 768) setCardWidth(400); // 360 + 40
      else if (w >= 640) setCardWidth(360); // 320 + 40
      else setCardWidth(300);               // 280 + 20 margin (mx-2.5)
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

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
    <div className="w-full max-w-full bg-gray-100 py-10 md:py-16 lg:py-20 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-8 md:mb-12 lg:mb-16 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900">
          Why 100xDevs?
        </h2>
        <p className="text-gray-600 mt-3 md:mt-4 text-base md:text-lg">
          Our most comprehensive and impactful learning experiences
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Left Button */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 lg:left-10 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white p-2.5 md:p-3 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-600"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Right Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 lg:right-10 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white p-2.5 md:p-3 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-600"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Track */}
        <div className="flex justify-center overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(50% - ${
                currentIndex * cardWidth + cardWidth / 2
              }px))`,
            }}
          >
            {cards.map((card, index) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={index}
                  className={`w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] mx-2.5 md:mx-5 shrink-0 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 transition-all duration-500 shadow-lg ${
                    isActive
                      ? "bg-indigo-900 text-white scale-105"
                      : "bg-white text-gray-700 opacity-70 scale-95"
                  }`}
                >
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-4">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed">
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
