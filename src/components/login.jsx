import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
const Base_Url = import.meta.env.VITE_API_URL;

function Login() {
  const navigator = useNavigate();
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            `${Base_Url}/api/login`,
            { email: email, password: password },
            { withCredentials: true }
        );
 
        const userRole = response.data.role;
        localStorage.setItem("token", response.data.token);
        if (userRole === 'admin') {
            Toast("Yahoo! Login Successfull!", "success");
            navigator("/admin");
        } else if (userRole === 'client') {
            Toast("Yahoo! Login Successfull!", "success");
            navigator("/customer/cars");
        } else if (userRole === 'showroom') {
            Toast("Welcome to Showroom!", "success");
            navigator("/showroom/inventory");
        } else {
            Toast("Role not recognized.", "error");
            navigator("/login"); 
        }
    } catch (error) {
        Toast(error.response?.data?.message || "An error occurred", "error");
    }
};
  return (
    <div className="flex items-center justify-center background min-h-screen min-w-max">
      <div className="w-screen h-fit max-w-md py-5 px-7 bg-gray-300 backdrop-blur-lg bg-white/30 border border-white/10 rounded-3xl  p-5 shadow-lg">
      <div className="flex flex-col items-center justify-center mb-6">
  <img
    src="/src/assets/logo.svg"
    className="w-[80px] mb-4"
    alt="Logo"
  />
  <h2 className="text-2xl font-bold text-[#02073F]">Login</h2>
</div>

        <form className="mt-8 rounded  mb-4 " onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              className="block text-[#02073F] text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmial(e.target.value)}
              id="email"
              placeholder="you@example.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-[#02073F] text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#02073F] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <p className="text-xs py-2 font-bold hover:cursor-pointer hover:text-[#ffffff] text-[#02073F]">
            Forgot password?
          </p>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#C17D3C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-[#02073F] text-xs">
          Don't have an account?&nbsp;
          <Link
            to="/signup"
            className="text-[#02073F] hover:text-[#ffffff] font-bold"
          >
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
