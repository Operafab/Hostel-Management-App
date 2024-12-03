import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import "./Register.css";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/userContext";

const override = {
  display: "block",
  margin: "100px auto",
};

const AdminReg = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });
  // console.log("running");
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValidMessage, setFormValidMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const timesIcon = <FaTimes color="red" size={20} />;
  const checkIcon = <BsCheck2All color="green" size={20} />;

  const switchIcon = (condition) => {
    return condition ? checkIcon : timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.name, e.target.value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    // console.log(formData)
    const password = formData.password;
    setUCase(/([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password));
    setNum(/([0-9])/.test(password));
    setSChar(/([!,%,&,@,#,_,*])/.test(password));
    setPasswordLength(password.length > 5);
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsSubmitting(true);

    try {
      const { fullname, email, password, password2 } = formData;
      if (!fullname || !email || !password || !password2) {
        setFormValidMessage("All fields are required");
        return;
      }
      if (password !== password2) {
        setFormValidMessage("Passwords do not match");
        return;
      }

      setIsSubmitting(true);
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/admin/register",
        formData,
        { withCredentials: true }
      );

      if (response?.data) {
        const adminInfo = response.data;
        setLoading(false);
        setUser(adminInfo);
        setIsSubmitting(false);
        setFormCompleted(true);
        toast.success("Registration successful");
        navigate("/home-dash", { state: { user: response.data } });
      }
    } catch (err) {
      setIsSubmitting(false);
      toast.error(error?.response?.data.msg)
      const message =
        err?.response?.data?.msg? 
        `${error.response.data.msg}` : "Internal Server Error";
      setFormValidMessage(message);
      setLoading(false);
    }
  };

  const handlePastePassword = (e) => {
    e.preventDefault();
    toast.error("Cannot paste into this field");
    return false;
  };

  return (
    <>
    {loading ? (<ClipLoader color="#3a86ff" cssOverride={override} loading={loading} />):(
      <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title">Create Account</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="--dir-column">
            <label htmlFor="fullname">Full Name : </label>
            <input
              type="text"
              onChange={handleInputChange}
              className="input"
              name="fullname"
              value={formData.fullname}
              placeholder="Enter your Full name"
              required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              onChange={handleInputChange}
              className="input"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              onChange={handleInputChange}
              className="input"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password">Confirm Password: </label>
            <input
              type="password"
              onChange={handleInputChange}
              className="input"
              value={formData.password2}
              onPaste={handlePastePassword}
              name="password2"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="card">
            <ul>
              <li className="indicator">
                <span>{switchIcon(uCase)} &nbsp; Lowercase & Uppercase</span>
              </li>
              <li className="indicator">
                <span>{switchIcon(num)} &nbsp; Number (0-9)</span>
              </li>
              <li className="indicator">
                <span>
                  {switchIcon(sChar)} &nbsp; Special Character (!@#$%^&*)
                </span>
              </li>
              <li className="indicator">
                <span>
                  {switchIcon(passwordLength)} &nbsp; At least 6 Characters
                </span>
              </li>
            </ul>
          </div>
          <button disabled={isSubmitting} className="--btn">
            {isSubmitting ? "Signing you up..." : "Create Account"}
          </button>
        </form>

        {formValidMessage && <p>{formValidMessage}</p>}

        <p>
          Already have an account ?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
    )}
      
    </>
  );
};
export default AdminReg;
