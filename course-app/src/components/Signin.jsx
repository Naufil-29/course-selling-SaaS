import api from "../utils/api";
import img from "../assets/harkirat-transparent.png";
import Button from "./Button";
import Input from "./Input";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignIn({ closeSignin, setUserInitial }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validate = (name, value) => {
    let newErrors = "";
    if (name === "username") {
      if (!value || value.length < 3) {
        newErrors = "Username must be at least 3 characters";
      }
    }
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors = "Invalid email address";
      }
    }
    if (name === "password") {
      if (!value || value.length < 6) {
        newErrors = "Password must be at least 6 characters";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: newErrors }));
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const signin = async () => {
    if (Object.values(errors).some((err) => err !== "")) {
      toast.error("Please fix errors first");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/users/signin", formData);
      const user = response.data.user;
      const firstChar = user.username[0].toUpperCase();
      setUserInitial(firstChar);
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("You are signed in");
      closeSignin();
    } catch (err) {
      console.error("Signin error:", err);
      toast.error("Error signing in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main fixed inset-0 z-50 w-screen h-screen bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto transition-all">
      {loading && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-black/20 backdrop-blur-sm">
          <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-white font-medium">Loading, please wait...</p>
        </div>
      )}
      <div className="card w-full max-w-md md:max-w-2xl md:w-[85%] lg:w-[70%] min-h-0 max-h-[90vh] md:max-h-[85vh] bg-white rounded-xl flex flex-col md:flex-row overflow-hidden my-auto">
        <div className="img-section relative w-full md:w-1/2 min-h-[180px] md:min-h-[400px] flex items-center justify-center bg-gradient-to-br from-[#020A3F] via-blue-900 to-[#020A3F] text-white flex-shrink-0">
          <div className="absolute top-0 left-0 right-0 p-4 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold pb-2 md:pb-5">
              Become a 100x developer
            </h1>
            <p className="text-sm md:text-base lg:text-xl font-semibold text-white/90">
              Hands-on bootcamps, real projects — start building today
            </p>
          </div>
          <img
            className="w-48 md:w-64 lg:w-80 absolute bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0"
            src={img}
            alt=""
          />
        </div>
        <div className="form-section w-full md:w-1/2 flex flex-col overflow-y-auto">
          <div className="header w-full min-h-14 px-4 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
            <p className="font-extrabold text-xl md:text-2xl">
              100<span className="text-red-600">x</span>Devs
            </p>
            <button
              type="button"
              onClick={closeSignin}
              className="w-10 h-10 bg-gray-500 rounded-full flex justify-center items-center text-white hover:bg-gray-600 min-w-[2.5rem] min-h-[2.5rem]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="form-content flex-1 p-4 md:p-6 lg:p-8">
            <p className="heading text-lg md:text-xl font-bold pb-6 md:pb-10">
              Sign in to your account
            </p>
            <div className="form-input flex flex-col gap-4">
              <Input
                errors={errors.email}
                onChange={handleChange}
                name="email"
                value={formData.email}
                heading="Email"
                placeholder="Enter your email"
              />
              <Input
                errors={errors.password}
                onChange={handleChange}
                name="password"
                value={formData.password}
                heading="Password"
                placeholder="Enter your password"
              />
              <div onClick={signin} className="w-full">
                <Button
                  loading={loading}
                  className="singup-button w-full"
                  text="Signin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
