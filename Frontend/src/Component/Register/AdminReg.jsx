
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { BsCheck2All } from 'react-icons/bs'
import "./Register.css"



const AdminReg = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValidMessage, setFormValidMessage] = useState(false);

  const timesIcon = <FaTimes color='red' size={20}/>
  const checkIcon = <BsCheck2All color='green' size={20}/>

  const switchIcon = (condition) =>{
    return condition ? checkIcon: timesIcon;
  }
  

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    console.log(e.target.name, e.target.value)
    setFormData((prevData)=>({...prevData, [name] : value}))
  };


  useEffect(()=>{
    // console.log(formData)
    const password = formData.password1
    setUCase(/([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password))
    setNum(/([0-9])/.test(password))
    setSChar(/([!,%,&,@,#,_,*])/.test(password));
    setPasswordLength(password.length > 5)
  }, [formData.password1]);
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    setIsSubmitting(true)
    setTimeout(()=>{
      setIsSubmitting(false)
    },4000);
  };

  return (
    <div className='container form__ --100vh'>
     <div className="form-container">
     <p  className='title'>Create Account</p>
      <form className='form' onSubmit={handleSubmit}>

        <div className='--dir-column'>
          <label htmlFor="fullname">Full Name : </label>
          <input type="text" onChange={handleInputChange} className='input' name='fullname' placeholder='Enter your Full name' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="email">Email : </label>
          <input type="email" onChange={handleInputChange} className='input' name='email' placeholder='Enter your email' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="password">Password : </label>
          <input type="password" onChange={handleInputChange} className='input' name='password1' placeholder='Enter your password' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="password">Confirm Password: </label>
          <input type="text" onChange={handleInputChange} className='input' name='password2' placeholder='Enter your password' required />
        </div>

        <div className="card">

          <ul>
            <li className='indicator'>
              <span >
               {switchIcon(uCase )} &nbsp; Lowercase & Uppercase
              </span>
            </li>
            <li className='indicator'>
              <span >
               {switchIcon (num)} &nbsp; Number (0-9)
              </span>
            </li>
            <li className='indicator'>
              <span >
               {switchIcon (sChar)} &nbsp; Special Character (!@#$%^&*)
              </span>
            </li>
            <li className='indicator'>
              <span >
                {switchIcon (passwordLength)} &nbsp; At least 6 Characters
              </span>
            </li>
          </ul>
        </div>
        <button 
        disabled={isSubmitting}
        className="--btn" >
         { isSubmitting? "Signing you up": "Create Account"}
        </button>
      </form>

      <p>Already have an account ? 
        <Link to="/login" >Login</Link> 
      </p>

     </div>
    </div>
  )
}

export default AdminReg