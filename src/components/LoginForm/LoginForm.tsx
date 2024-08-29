import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { MdCancel } from "react-icons/md";

interface LoginPopupProps {
  setShowLogin: (show: boolean) => void;
}

const LoginForm: React.FC<LoginPopupProps> = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState<string>("sign up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    let newUrl = process.env.NEXT_PUBLIC_API_URL || "";
    if (currState === "login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("token", response.data.token);
        }
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        `Error: ${error.response?.data?.message || "Something went wrong"}`
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <div className="close-icon" onClick={() => setShowLogin(false)}>
            <MdCancel />
          </div>
        </div>
        <div className="login-popup-input">
          {currState !== "login" && (
            <input
              name="name"
              onChange={handleChange}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={handleChange}
            value={data.email}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="password"
            onChange={handleChange}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "sign up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "login" ? (
          <p>
            Create new account
            <span onClick={() => setCurrState("sign up")}> Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("login")}> Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
