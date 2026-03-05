import axios from 'axios';
import api from '../utils/api';
import img from '../assets/harkirat-transparent.png';
import Button from './Button';
import Input from './Input';
import { X } from 'lucide-react';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

export default function SignIn({closeSignin, setUserInitial}) { 
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({ 
        username: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({ 
        username: "",
        email: "",
        password: ""
    });

    const validate = (name, value) => { 
        let newErrors = "";

        if(name === "username"){ 
            if(!value || value.length < 3){ 
                console.log(value)
                newErrors = "Username must be atleast 3 characters";
                console.log(newErrors)
        }
        }

        if(name === "email"){ 
            console.log(value)
            if(!/\S+@\S+\.\S+/.test(value)){ 
            newErrors = "Invalid email address"
        }
        }

        if(name === "password"){ 
            if(!value || value.length < 6){ 
            newErrors = "Password must be atleast 6 characters"
            console.log(newErrors)
        }
        }
        setErrors((prev) => ({ 
            ...prev,
            [name]: newErrors
        }));
        return newErrors
    };

    const handleChange = (e) => { 
        const { name, value } = e.target;

        setFormData((prev) => ({ 
            ...prev,
            [name]: value
        }));

        validate(name, value); // Live validation
    };

    const signin = async() => { 
        if (Object.values(errors).some((err) => err !== "")) {
                toast.error("Please fix errors first");
                return;
            }
        setLoading(true)
        try{ 
         const response = await api.post("/users/signin",formData);

         const user = response.data.user;
         const firstChar = user.username[0].toUpperCase();
         setUserInitial(firstChar);

         const accessToken = response.data.accessToken;
         localStorage.setItem('accessToken', accessToken);
         localStorage.setItem('user', JSON.stringify(user));
         toast.success("you are signedIn");
         closeSignin();
        }
        catch(err){ 
            console.error("Signip error:", err);
            toast.error("error In singIn");
        }
        finally{ 
            setLoading(false)
        }
    }

    return( 
        <div className="main fixed inset-0 z-50 w-screen h-screen bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all">
            {loading && (
                <div className="w-[20%] h-[20%] absolute left-215 flex flex-col items-center gap-5 p-5 rounded-xl justify-center mt-2 bg-black/10 backdrop-blur-lg">
                <div className="w-15 h-15 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <p>loading please wait...</p>
                </div>
            )} 
            <div className="card w-[70%] h-[80%] bg-white rounded-xl p-8 flex items-center justify-center"> 
                <div className="img-section relative w-full h-full rounded-xl flex items-center justify-center bg-linear-to-br from-[#020A3F] via blue-900 to-[#020A3F] text-white">
                    <div className='absolute top-0  p-4 w-[90%]'>
                        <h1 className='text-4xl font-bold pb-5'>Become a 100x developer</h1> 
                        <h1 className='text-xl font-semibold ' >Hands-on bootcamps, real-porjects - start building today</h1>
                    </div>
                    <img className='w-80 absolute bottom-0' src={img}></img>
                </div>
                <div className="form-section w-full h-full rounded-xl p-5">
                     <div className='header w-full h-10 border-none text-center flex items-center justify-center'> 
                        <p className='w-[95%] font-extrabold text-2xl'>100<span className='text-red-600'>x</span>Devs</p>
                        <div onClick={closeSignin} className='w-10 h-10 bg-gray-500 rounded-full flex justify-center items-center text-white border-none'><X/></div>
                     <div></div>
                     </div>
                <div className='form-content '> 
                    <p className='heading text-xl font-bold pb-10'>Sign in to your account</p>

                    <div className='form-input'> 
                        <div className="email-input"> 
                            <Input errors={errors.email} onChange={handleChange} name="email" value={formData.email} heading="Email" placeholder="Enter your email" />
                        </div>
                        <div className="password-input"> 
                            <Input errors={errors.password} onChange={handleChange} name="password" value={formData.password} heading="Password" placeholder="Enter your password" />
                        </div>
                        <div disabled={loading} className='singup-button disabled:bg-blue-900 disabled:text-black' onClick={signin}> 
                            <Button loading={loading} className="singup-button" text="Signin"/>
                        </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
    )
}