import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "./signup";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { login } = useAuthStore();

  const [isLoading,setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const router = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await login({ email, password });
    console.log(response );
    if (response && response.success) {
      setIsLoading(false);
      router("/home");
    }
    console.log(response);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setPasswordType(showPassword ? "password" : "text");
  };
  const cummonStyles = "border outline-none rounded-[10px] py-2 px-3";
  return (
    <div className="flex flex-col gap-4 items-center h-[100vh] md:w-[40%] w-[90%]  mx-auto justify-center">
      <h1 className="font-bold text-emerald-700 text-[30px]">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
        <input
          className={`${cummonStyles}`}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <div className={`${cummonStyles} flex items-center justify-between`}>
          <input
            className={`border-none outline-none w-full`}
            placeholder="Password"
            type={passwordType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? <FaEye onClick={handleShowPassword}/> : <FaEyeSlash onClick={handleShowPassword}/>}
          
        </div>
        <button
          type="submit"
          className={`${cummonStyles} bg-emerald-500 text-white border-none`}
        >
          {isLoading ? (<Spinner/>) : "Login"}
        </button>
      </form>
      <p>
        Don&apos;t have an account?{" "}
        <span className="text-semibold hover:underline">
          <Link to={"/signup"}> Signup</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
