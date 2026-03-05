 import img1 from "../assets/80LPA.jpg";
 import img2 from "../assets/remote.jpg";
 import img3 from "../assets/40LPA.jpg";
import play from "../assets/play-16.ico"
 
 export default function Podcasts(){ 
    const cards = [ 
        { 
            title: "How a 21-Year-Old Got an ₹80 LPA Offer (Before Degree!)",
            image: img1,
        },
        { 
            title: "$25000 Bug Bounty, $100k Offer as a Solana Engineer",
            image: img2
        },
        { 
            title: "How He Cracked A 40Lakhs Remote Coding Job (Complete Story)",
            image: img3
        },
    ]

    return<div className="w-full h-full flex items-center justify-center"> 
            <div className="w-[80%] h-137.5 flex flex-col gap-20 p-10 mt-20 pt-10 bg-linear-to-b from-[#00a08f] to-[#00225c] rounded-2xl"> 
                <div className="headings"> 
                    <p className="text-5xl font-semibold text-white">Listen To Our Podcasts</p>
                    <p className="text-xl text-gray-300 pt-5">Unfiltered decisions on engineering, startups and career growth with industry<br/></p>
                    <p className="text-xl text-gray-300 "> experts and successfull developers</p>
                </div>

                <div className="podcasts flex items-end justify-end gap-5"> 
                    {cards.map((card, index) => { 
                        return<div key={index} className="w-70 bg-white h-65 p-3 rounded-xl"> 
                        <div className="relative ">
                         <div className="opacity-0 hover:opacity-100 absolute h-45 w-full rounded-4xl bg-white/0 backdrop-blur-xs transition-all"> 
                            <div className="relative top-12 left-21 h-20 w-20 bg-red-600 rounded-full flex items-center justify-center text-center"><img src={play} className="w-6"/></div>
                         </div> 
                        <img className="h-45 w-full object-fill rounded-4xl p-2 hover:gray-200" src={card.image} alt={card.title}/>
                         </div> 

                          <div className="w-full">{card.title}</div>
                        </div>
                    })}
                </div>
            </div>
        </div>
 }