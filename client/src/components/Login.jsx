import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setUser, setToken } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(error.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed  top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white rounded-xl p-10"
        action=""
      >
        <h1 className="text-center text-2xl font-medium text-neutral-700 ">
          {state}
        </h1>
        <p className="text-sm">
          Please welcome back! Please sign in to continue{" "}
        </p>
        {state !== "Login" && (
          <div className="px-6 py-2 flex gap-2 items-center rounded-full mt-5 border">
            <img src={assets.user_icon} alt="" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full name"
              className="outline-none text-sm"
            />
          </div>
        )}

        <div className="px-6 py-2 flex gap-2 items-center rounded-full mt-4 border">
          <img src={assets.email_icon} alt="" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email Id"
            className="outline-none text-sm"
          />
        </div>

        <div className="px-6 py-2 flex gap-2 items-center rounded-full mt-4 border">
          <img src={assets.lock_icon} alt="" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="outline-none text-sm"
          />
        </div>
        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password
        </p>
        <button className="bg-blue-600 w-full rounded-full py-2 text-white">
          {state === "Login" ? "Login" : " create account"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Dont have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Log In")}
            >
              Log In
            </span>
          </p>
        )}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=""
          className="top-5 right-5 absolute cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
