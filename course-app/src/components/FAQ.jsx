

export default function FAQ(){ 

    const faqs = [ 
        { 
            question: "What makes 100xDevs different from other coding platforms?",
            answer: "No compromises. With 100xDevs, you don't have to choose between different tutors and random tutorials. Get the power of building production-ready applications."
        },
        { 
            question: "Do I need prior coding experience to join?",
            answer: "No prior experience is required. Our courses are designed to take you from beginner to advanced levels with structured learning paths."
        },
        { 
            question: "What kind of support can I expect?",
            answer: "You'll get 24/7 community support through our active Discord, weekly study groups, peer code reviews, and direct mentorship opportunities."
        },
        { 
            question: "Are the courses self-paced or scheduled?",
            answer: "We offer both self-paced learning materials and scheduled live sessions, giving you the flexibility to learn at your own pace while staying connected with the community."
        },
        { 
            question: "Will I get a certificate after completion?",
            answer: "Yes, you'll receive a certificate of completion for each course you finish, along with portfolio projects that demonstrate your skills to potential employers."
        },
    ]

    return<div className="mt-10 pt-20 h-250 bg-gray-100"> 
             <div className="heading text-center">
                 <p className="text-5xl font-semibold">FAQs</p>
                 <h3 className="font-semibold text-gray-500">Get your questions answers</h3>
             </div>
             <div className="faqs flex flex-col items-center gap-8 justify-center px-50 py-20"> 
                {faqs.map((faq, index) => { 
                    return<div className="text-xl h-20 hover:h-50 font-semibold bg-white rounded-2xl transition-all" key={index}> 
                        <div className="question w-full h-20 p-10  rounded-2xl">{faq.question}</div>
                        <div className="answer w-full text-lg opacity-0 bg-gray-200 hover:opacity-100 p-10 transition-all rounded-2xl">{faq.answer}</div>
                    </div>
                })}
             </div>
    </div>
}