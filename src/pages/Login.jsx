import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log("FormData", formData);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // login logic pending
  };

  return (
    <div className="flex items-center w-full justify-center my-auto font-poppins ">
      <div className="bg-slate-100 p-8 rounded-lg shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] w-11/12 max-w-md  ">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <p className="mb-4">Hi, Welcome back 👋</p>
        <button className="w-full border border-zinc-900  text-zinc-900 py-2 rounded-lg mb-4 flex items-center justify-center">
          <FcGoogle className="mx-2 text-[20px]" />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500">
          or Login with Email
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border  rounded-lg focus:outline-none focus:border-blue-500 bg-slate-100"
              placeholder="E.g. luxprajapati@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-slate-100"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <NavLink to="/forgotPassword" className="text-blue-500">
              Forgot Password?
            </NavLink>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          Not registered yet?{" "}
          <NavLink to="/signup" className="text-blue-500">
            Crate an account
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
