import img from '../assets/harkirat-transparent.png';
import Button from './Button';
import Input from './Input';
import { X } from 'lucide-react';
import axios from 'axios';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function SignUp({closeSignup, openSignin}) { 
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

    const signup = async () => {
        try {
            if (Object.values(errors).some((err) => err !== "")) {
                toast.error("Please fix errors first");
                return;
            }

            setLoading(true);

        const response = await axios.post(
         "http://localhost:3000/users/signup", formData);

          
          const result = response.data;
          console.log(result);
          toast.success("user created successfully")
          

          closeSignup();
          openSignin();

  } catch (err) {
    console.error("Signup error:", err);
    toast.error("error creating user")
  }
  finally{ 
    setLoading(false)
  }


};
return( 
    <div className="main fixed top-0 z-50 w-screen h-screen bg-black/30 backdrop-blur-sm flex items-center justify-center"> 
    {loading && (
      <div className="w-[20%] h-[20%] absolute left-215 flex flex-col items-center gap-5 p-5 rounded-xl justify-center mt-2 bg-black/10 backdrop-blur-lg">
        <div className="w-15 h-15 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        <p>loading please wait...</p>
      </div>
    )}
            <div className="card w-[70%] h-[80%] bg-white rounded-xl  p-8 flex items-center justify-center"> 
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
                        <div onClick={closeSignup} className='w-10 h-10 bg-gray-500 rounded-full flex justify-center items-center text-white border-none'><X/></div>
                     <div></div>
                     </div>
                <div className='form-content '> 
                    <p className='heading text-xl font-bold pb-10'>Create your account</p>

                    <div className='form-input'> 
                        <div className="username-input"> 
                            <Input errors={errors.username} onChange={handleChange} name="username" value={formData.username} heading="Username" placeholder="Enter your username" />
                        </div>
                        <div className="email-input"> 
                            <Input errors={errors.email} onChange={handleChange} name="email" value={formData.email} heading="Email" placeholder="Enter your email" />
                        </div>
                        <div className="password-input"> 
                            <Input errors={errors.password} onChange={handleChange} name="password" value={formData.password} heading="Password" placeholder="Enter your password" />
                        </div>
                        <div className='singup-button disabled:bg-blue-900 disabled:text-black' onClick={signup}> 
                            <Button loading={loading} className="singup-button" text="Signup"/>
                        </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
    )
}