import React, { useContext, useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const initialState = {
  email: "",
  name: "",
  age: "",
  nationality: "",
  g_name: "",
  g_email: "",
  gender: "",
  roomNum: "",
};

const StudentReg = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        email,
        name,
        age,
        nationality,
        g_name,
        g_email,
        gender,
        roomNum,
      } = formData;

      if (
        !email ||
        !name ||
        !age ||
        !nationality ||
        !g_name ||
        !g_email ||
        !gender ||
        !roomNum
      ) {
        toast.error("Please fill all fields");
      }

      setIsSubmitting(true);
     
      const response = await axios.post(
        "http://localhost:5000/student/register-student",
        formData,
        { withCredentials: true }
      );
      console.log(response);
      console.log(response.data);
      toast.success("Student Added successfully");
      setIsLoading(true);
      navigate("/student-dash");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <ClipLoader color="#3a86ff" cssOverride={override} loading={isLoading} />
      ) : (
        <div className="container form__ --100vh">
          <div className="form-container">
            <p className="title">Register a new Student</p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="--dir-column">
                <label htmlFor="fullname">Student's Name : </label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your Full name"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="age">Age : </label>
                <input
                  type="number"
                  className="input"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="nationality">Nationality : </label>
                <input
                  type="text"
                  className="input"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="Enter your nationality"
                  required
                />
              </div>
              <div className="--dir-column">
                <label htmlFor="gender">Gender: </label>
                <select
                  name="gender"
                  className="input"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option disabled selected>
                    Select a gender
                  </option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Others"}>Others</option>
                </select>
              </div>

              <div className="--dir-column">
                <label htmlFor="room-number">Room Number : </label>
                <input
                  type="number"
                  className="input"
                  name="roomNum"
                  value={formData.roomNum}
                  onChange={handleInputChange}
                  placeholder="Enter your room number"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="contact email">Contact Email: </label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="g_name">Guardian Name: </label>
                <input
                  type="text"
                  className="input"
                  name="g_name"
                  onChange={handleInputChange}
                  value={formData.g_name}
                  placeholder="Enter your guardian name"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="g_email">Guardian Contact Email: </label>
                <input
                  type="email"
                  className="input"
                  name="g_email"
                  value={formData.g_email}
                  onChange={handleInputChange}
                  placeholder="Enter your guardian email"
                  required
                />
              </div>

              <button className="--btn" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Student"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentReg;
