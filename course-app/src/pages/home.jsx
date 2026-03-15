
import { useEffect, useState } from "react";
import Carsoul from "../components/Carsoul";
import FeaturedCohorts from "../components/FeaturedProds";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Podcasts from "../components/Podcasts";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Signup from "../components/Signup";
import SignIn from "../components/Signin";

export default function HomePage() { 
    const [showSignup, setShowSignup] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const [userInitial, setUserInitial] = useState(null);

    useEffect(() => { 
        const storedUser = localStorage.getItem('user');
        if(storedUser){ 
            const user = JSON.parse(storedUser);
            const firstChar = user.username[0].toUpperCase();
            setUserInitial(firstChar);
        }
    },[])
    return (
    <div className="relative overflow-x-hidden min-w-0"> 
        <Navbar openSignup={() => setShowSignup(true)} openSignin={() => setShowSignin(true)} userInitial={userInitial} setUserInitial={setUserInitial}/>
        {showSignup && ( 
            <Signup openSignin={() => setShowSignin(true)} closeSignup={() => setShowSignup(false)}/>
        )}
        {showSignin && ( 
            <SignIn closeSignin={() => setShowSignin(false)} setUserInitial={setUserInitial}/>
        )}
        <Hero/>
        <Carsoul/>
        <FeaturedCohorts/>
        <Podcasts/>
        <FAQ/>
        <Footer/>
    </div>
    );
}