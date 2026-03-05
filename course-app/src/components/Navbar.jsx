import { Search } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import NavbarSearch from "./NavbarSearch.jsx";

export default function Navbar({openSignup, openSignin, userInitial, setUserInitial}){ 
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const logout = async() => { 
        const res = await api.post("/logout");
        const result = res.data;
        console.log(result);
        setUserInitial(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = "/";
    }

    return<div className="fixed z-50 top-0 bg-white w-full h-18 border border-gray-300 flex items-center justify-between pl-20 pr-30"> 
            <div className="section-1 flex items-center justify-center gap-10 text-black"> 
                <div className="logo"> 
                    <p className='font-extrabold text-xl text-black'>100<span className='text-red-600'>x</span>Devs</p>
                </div>
                <div className="home font-semibold"> 
                    <p onClick={() => navigate("/")}>Home</p>
                </div>
                <div className="courses font-semibold"> 
                    <p onClick={() => navigate("/courses")}>Courses</p>
                </div>
                <div className="store font-semibold"> 
                    <p onClick={() => navigate("/purchased")} >Purchased</p>
                </div>
            </div>
            <div className="section-2 flex items-center justify-center gap-5"> 
                <div className="border flex items-center justify-center rounded-xl gap-2 pl-2 text-gray-300 hover:border-blue-700 hover:text-black"> 
                    <Search size={15}/>
                    <NavbarSearch className="py-1 border-0 outline-none rounded-xl text-black" type="text" placeholder= "Type to search"/>
                </div>
                {!userInitial ? ( 
                    <div className="btns flex items-center justify-between gap-5"> 
                    <button onClick={openSignup} className="px-5 py-2 bg-white  border border-gray-500 hover:bg-gray-200 rounded-xl text-sm">SignUp</button>
                    <button onClick={openSignin} className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white border rounded-xl text-sm">Login</button>
                </div>
                ):( 
                  <div className="flex items-center jsutify-center gap-4">
                    <div className="w-12 h-12 bg-blue-900 rounded-full text-white text-3xl font-semibold flex items-center justify-center">{userInitial}</div>
                    <div className="logout-btn bg-red-600 px-2 py-1 rounded-xl text-white font-bold" onClick={logout}><button>Logout</button></div>
                  </div>
                )}
            </div>
    </div>
}