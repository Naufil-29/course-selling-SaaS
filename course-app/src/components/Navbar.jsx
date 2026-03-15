import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import NavbarSearch from "./NavbarSearch.jsx";

export default function Navbar({
  openSignup,
  openSignin,
  userInitial,
  setUserInitial,
}) {
  const [isLogged, setIsLogged] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    const res = await api.post("/logout");
    const result = res.data;
    console.log(result);
    setUserInitial(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navTo = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <>
      <div className="fixed z-50 top-0 bg-white w-full min-h-14 border border-gray-300 flex items-center justify-between px-4 py-3 md:px-6 md:py-3 lg:pl-20 lg:pr-30">
        {/* Logo - always visible */}
        <div
          className="logo cursor-pointer flex-shrink-0"
          onClick={() => navTo("/")}
        >
          <p className="font-extrabold text-lg md:text-xl text-black">
            100<span className="text-red-600">x</span>Devs
          </p>
        </div>

        {/* Desktop/Tablet nav links - hidden on mobile */}
        <div className="section-1 hidden lg:flex items-center justify-center gap-6 xl:gap-10 text-black">
          <div
            className="home font-semibold cursor-pointer hover:text-blue-900"
            onClick={() => navTo("/")}
          >
            <p>Home</p>
          </div>
          <div
            className="courses font-semibold cursor-pointer hover:text-blue-900"
            onClick={() => navTo("/courses")}
          >
            <p>Courses</p>
          </div>
          <div
            className="store font-semibold cursor-pointer hover:text-blue-900"
            onClick={() => navTo("/purchased")}
          >
            <p>Purchased</p>
          </div>
        </div>

        {/* Desktop/Tablet right section - search + auth - hidden on mobile */}
        <div className="section-2 hidden lg:flex items-center justify-center gap-4 xl:gap-5">
          <div className="border flex items-center justify-center rounded-xl gap-2 pl-2 text-gray-300 hover:border-blue-700 hover:text-black min-w-[200px]">
            <Search size={15} />
            <NavbarSearch
              className="py-1 border-0 outline-none rounded-xl text-black w-full"
              type="text"
              placeholder="Type to search"
            />
          </div>
          {!userInitial ? (
            <div className="btns flex items-center justify-between gap-3 xl:gap-5">
              <button
                onClick={openSignup}
                className="px-4 py-2 bg-white border border-gray-500 hover:bg-gray-200 rounded-xl text-sm"
              >
                SignUp
              </button>
              <button
                onClick={openSignin}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white border rounded-xl text-sm"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-900 rounded-full text-white text-xl md:text-3xl font-semibold flex items-center justify-center">
                {userInitial}
              </div>
              <button
                type="button"
                onClick={logout}
                className="logout-btn bg-red-600 px-3 py-1.5 rounded-xl text-white font-bold text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-black inline-flex items-center justify-center min-w-[44px] min-h-[44px]"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-down menu */}
      <div
        className={`fixed top-14 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-lg lg:hidden transition-all duration-200 ease-out ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-4 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="border flex items-center rounded-xl gap-2 pl-3 py-2 text-gray-300 hover:border-blue-700">
            <Search size={18} />
            <NavbarSearch
              className="py-2 border-0 outline-none rounded-xl text-black flex-1 min-w-0"
              type="text"
              placeholder="Search courses..."
            />
          </div>
          <nav className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => navTo("/")}
              className="text-left py-3 px-3 font-semibold text-black hover:bg-gray-100 rounded-xl"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navTo("/courses")}
              className="text-left py-3 px-3 font-semibold text-black hover:bg-gray-100 rounded-xl"
            >
              Courses
            </button>
            <button
              type="button"
              onClick={() => navTo("/purchased")}
              className="text-left py-3 px-3 font-semibold text-black hover:bg-gray-100 rounded-xl"
            >
              Purchased
            </button>
          </nav>
          <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
            {!userInitial ? (
              <>
                <button
                  onClick={() => {
                    openSignup();
                    closeMobileMenu();
                  }}
                  className="w-full py-3 px-4 bg-white border border-gray-500 hover:bg-gray-100 rounded-xl text-sm font-medium"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    openSignin();
                    closeMobileMenu();
                  }}
                  className="w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-medium"
                >
                  Login
                </button>
              </>
            ) : (
              <div className="flex items-center justify-between gap-3 py-2">
                <div className="w-10 h-10 bg-blue-900 rounded-full text-white text-xl font-semibold flex items-center justify-center">
                  {userInitial}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex-1 py-3 px-4 bg-red-600 rounded-xl text-white font-bold text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
