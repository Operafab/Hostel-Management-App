import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Passwordinput from "../PasswordInput/PasswordInput";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // const [formValidMessage, setFormValidMessage] = useState("")
  const {setUser} = useContext(UserContext)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.name, e.target.value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      if (!email || !password) {
        toast.error("All fields are required");
        return;
      }
      setIsSubmitting(true);
      const response = await axios.post(
        `${BASE_URL}/admin/login`,
        formData,
        { withCredentials: true }
      );
      console.log(response);
      toast.success("Login successful");
      setUser(response.data);
      navigate("/home-dash", { state: { user: response.data } });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title">Admin Login</p>
        <form className="form" onSubmit={loginUser}>
          <div className="--dir-column">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Enter your email"
              required
              value={FormData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password"> Password:</label>
            <Passwordinput
              placeholder="password"
              name="password"
              value={FormData.password}
              onChange={handleInputChange}
            />
          </div>
          <button className="--btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* {formValidMessage && (
          <p className='error-message'>
            {formValidMessage}
          </p>
        )} */}
        <p>
          Dont have an account yet? <Link to="/">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
