import img1 from "../assets/80LPA.jpg";
import img2 from "../assets/remote.jpg";
import img3 from "../assets/40LPA.jpg";
import play from "../assets/play-16.ico";

export default function Podcasts() {
  const cards = [
    {
      title: "How a 21-Year-Old Got an ₹80 LPA Offer (Before Degree!)",
      image: img1,
    },
    {
      title: "$25000 Bug Bounty, $100k Offer as a Solana Engineer",
      image: img2,
    },
    {
      title: "How He Cracked A 40Lakhs Remote Coding Job (Complete Story)",
      image: img3,
    },
  ];

  return (
    <div className="w-full flex items-center justify-center px-4 py-10 md:py-16">
      <div className="w-full max-w-6xl min-h-0 flex flex-col gap-10 md:gap-16 lg:gap-20 p-6 md:p-8 lg:p-10 mt-10 md:mt-16 lg:mt-20 bg-gradient-to-b from-[#00a08f] to-[#00225c] rounded-2xl">
        <div className="headings text-center md:text-left">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Listen To Our Podcasts
          </p>
          <p className="text-base md:text-lg lg:text-xl text-gray-300 pt-3 md:pt-5">
            Unfiltered decisions on engineering, startups and career growth with
            industry experts and successful developers
          </p>
        </div>

        <div className="podcasts flex flex-col md:flex-row items-stretch md:items-end justify-center gap-6 md:gap-5 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-full md:w-64 lg:w-72 bg-white rounded-xl p-3 flex flex-col flex-1 md:flex-initial max-w-sm md:max-w-none mx-auto md:mx-0"
            >
              <div className="relative group">
                <div className="opacity-0 group-hover:opacity-100 absolute inset-0 rounded-xl bg-black/20 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-red-600 rounded-full flex items-center justify-center">
                    <img src={play} className="w-6 h-6 md:w-8 md:h-8" alt="Play" />
                  </div>
                </div>
                <img
                  className="h-40 md:h-44 lg:h-52 w-full object-cover rounded-xl p-2"
                  src={card.image}
                  alt={card.title}
                />
              </div>
              <p className="w-full mt-3 text-sm md:text-base font-medium text-gray-900 line-clamp-2">
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
