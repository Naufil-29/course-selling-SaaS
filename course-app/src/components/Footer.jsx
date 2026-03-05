import img1 from "../assets/youtube.png"
import img2 from "../assets/twitter.png"
import img3 from "../assets/linked-In.webp"
import img4 from "../assets/instagram.png"

export default function Footer(){ 
    return<div className="pt-20 h-[70vh] bg-black p-10 text-white"> 
            <div className="flex items-center justify-around"> 
                <div className="text-white"><p className='font-extrabold text-2xl'>100<span className='text-red-600'>x</span>Devs</p></div>
                <div className="flex flex-col gap-4 text-gray-200">
                    <p>Terms & Conditions</p>
                    <p>Privacy & Policy</p>
                    <p>Refund & Cancellation</p>
                </div>
                <div>
                 <div className="flex items-center justify-center gap-2"> 
                    <div className="w-15 h-12 rounded-xl bg-gray-100 pt-1">
                        <img className="w-10 p-0 m-0 mx-auto rounded-xl bg-white" src={img1}/>
                    </div>
                    <div className="w-15 h-12 rounded-xl bg-gray-100 pt-1">
                        <img className="w-10 p-0 m-0 mx-auto rounded-xl bg-white" src={img2}/>
                    </div>
                    <div className="w-15 h-12 rounded-xl bg-gray-100 pt-1">
                        <img className="w-10 p-1 mx-auto rounded-xl bg-white" src={img3}/>
                    </div>
                    <div className="w-15 h-12 rounded-xl bg-gray-100 pt-1">
                        <img className="w-10 mx-auto rounded-xl bg-white" src={img4}/>
                    </div>
                   
                 </div>
                 <p className="text-gray-200 text-sm mt-5"> © 2026 100xDevs. All rights reserved.</p>
                </div>
             </div>
             <div className="w-[90vw]"><p className='font-extrabold text-9xl h-90 flex items-center  justify-center text-center'>100<span className='text-red-600'>x</span>Devs</p></div>
         </div>
}