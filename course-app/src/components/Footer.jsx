import img1 from "../assets/youtube.png";
import img2 from "../assets/twitter.png";
import img3 from "../assets/linked-In.webp";
import img4 from "../assets/instagram.png";

export default function Footer() {
  return (
    <div className="pt-12 md:pt-16 lg:pt-20 min-h-0 pb-8 bg-black px-4 md:px-8 lg:p-10 text-white">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-around gap-8 md:gap-6">
        <div className="text-white text-center md:text-left">
          <p className="font-extrabold text-xl md:text-2xl">
            100<span className="text-red-600">x</span>Devs
          </p>
        </div>
        <div className="flex flex-col gap-3 md:gap-4 text-gray-200 text-center md:text-left">
          <p className="cursor-pointer hover:text-white">Terms & Conditions</p>
          <p className="cursor-pointer hover:text-white">Privacy & Policy</p>
          <p className="cursor-pointer hover:text-white">Refund & Cancellation</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center justify-center gap-2">
            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-gray-100 pt-1 flex items-center justify-center min-w-[3rem] min-h-[3rem]"
              aria-label="YouTube"
            >
              <img
                className="w-8 h-8 object-contain rounded-lg"
                src={img1}
                alt="YouTube"
              />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-gray-100 pt-1 flex items-center justify-center min-w-[3rem] min-h-[3rem]"
              aria-label="Twitter"
            >
              <img
                className="w-8 h-8 object-contain rounded-lg"
                src={img2}
                alt="Twitter"
              />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-gray-100 pt-1 flex items-center justify-center min-w-[3rem] min-h-[3rem]"
              aria-label="LinkedIn"
            >
              <img
                className="w-8 h-8 object-contain rounded-lg p-0.5"
                src={img3}
                alt="LinkedIn"
              />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-gray-100 pt-1 flex items-center justify-center min-w-[3rem] min-h-[3rem]"
              aria-label="Instagram"
            >
              <img
                className="w-8 h-8 object-contain rounded-lg"
                src={img4}
                alt="Instagram"
              />
            </a>
          </div>
          <p className="text-gray-200 text-xs md:text-sm mt-4 md:mt-5 text-center md:text-left">
            © 2026 100xDevs. All rights reserved.
          </p>
        </div>
      </div>
      <div className="w-full mt-10 md:mt-12 lg:mt-16 flex items-center justify-center">
        <p className="font-extrabold text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-center">
          100<span className="text-red-600">x</span>Devs
        </p>
      </div>
    </div>
  );
}
