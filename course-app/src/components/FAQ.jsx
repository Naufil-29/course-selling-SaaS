import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What makes 100xDevs different from other coding platforms?",
      answer:
        "No compromises. With 100xDevs, you don't have to choose between different tutors and random tutorials. Get the power of building production-ready applications.",
    },
    {
      question: "Do I need prior coding experience to join?",
      answer:
        "No prior experience is required. Our courses are designed to take you from beginner to advanced levels with structured learning paths.",
    },
    {
      question: "What kind of support can I expect?",
      answer:
        "You'll get 24/7 community support through our active Discord, weekly study groups, peer code reviews, and direct mentorship opportunities.",
    },
    {
      question: "Are the courses self-paced or scheduled?",
      answer:
        "We offer both self-paced learning materials and scheduled live sessions, giving you the flexibility to learn at your own pace while staying connected with the community.",
    },
    {
      question: "Will I get a certificate after completion?",
      answer:
        "Yes, you'll receive a certificate of completion for each course you finish, along with portfolio projects that demonstrate your skills to potential employers.",
    },
  ];

  return (
    <div className="mt-10 pt-12 md:pt-16 lg:pt-20 min-h-0 pb-16 md:pb-20 bg-gray-100">
      <div className="heading text-center px-4">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold">FAQs</p>
        <h3 className="font-semibold text-gray-500 mt-1 md:mt-2">
          Get your questions answered
        </h3>
      </div>
      <div className="faqs flex flex-col items-center gap-4 md:gap-6 lg:gap-8 justify-center px-4 md:px-8 lg:px-12 py-10 md:py-16 lg:py-20 max-w-3xl mx-auto">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="w-full font-semibold bg-white rounded-2xl transition-all overflow-hidden shadow-sm hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="question w-full text-left p-4 md:p-6 lg:p-8 rounded-2xl text-base md:text-lg lg:text-xl min-h-[4rem] flex items-center"
              >
                {faq.question}
              </button>
              <div
                className={`answer w-full text-sm md:text-base lg:text-lg bg-gray-100 transition-all duration-200 overflow-hidden ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="p-4 md:p-6 lg:p-8 pt-0 text-gray-700 font-normal">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
