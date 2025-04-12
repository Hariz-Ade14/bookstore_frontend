import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Spinner() {
  return <CircularProgress color="success" />;
}
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading } = useAuthStore();
  const router = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }
      const response = await signup({ name, email, password });
      if (response && response.success) {
        toast.success('Signup successful');
        router("/login");
      }
      console.log(response);
    } catch (error) {
      return error;
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setPasswordType(showPassword ? "password" : "text");
  };

  const cummonStyles = "border outline-none rounded-[10px] py-2 px-3";
  return (
    <>
    <div className="flex flex-col gap-4 items-center h-[100vh] md:w-[40%] w-[90%]  mx-auto justify-center">
      <h1 className="font-bold text-emerald-700 text-[30px]">Signup</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full">
        <input
          className={`${cummonStyles}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
        />
        <input
          className={`${cummonStyles}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
          {showPassword ? (
            <FaEye onClick={handleShowPassword} />
          ) : (
            <FaEyeSlash onClick={handleShowPassword} />
          )}
        </div>
        <button
          className={`${cummonStyles} bg-emerald-500 text-white border-none`}
          type="submit"
        >
          {isLoading ? <Spinner /> : "Signup"}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="text-semibold hover:underline">
          <Link to={"/login"}> Login</Link>
        </span>
      </p>
    </div>
    <ToastContainer/>
    </>
  );
};

export default Signup;
