import React from 'react'
import './Register.css'

const StudentReg = () => {
  return (
    <div className='container form__ --100vh'>
      <p  className='title'>Register a new Student</p>
      <form className='form'>

        <div className='--dir-column'>
          <label htmlFor="fullname">Student's Name : </label>
          <input type="text" className='input' name='fullname' placeholder='Enter your Full name' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="age">Age : </label>
          <input type="number" className='input' name='email' placeholder='Enter your age' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="room-number">Room Number : </label>
          <input type="number" className='input' name='room-number' placeholder='Enter your room number' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="contact email">Contact Email: </label>
          <input type="email" className='input' name='password2' placeholder='Enter your email' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="guardian-name">Guardian Name: </label>
          <input type="text" className='input' name='guidian-name' placeholder='Enter your guardian name' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="email">Guardian Contact Email: </label>
          <input type="email" className='input' name='email2' placeholder='Enter your guardian email' required />
        </div>

        {/* <div className="card">

          <ul>
            <li className='indicator'>
              <span >
                &nbsp; Lowercase & Uppercase
              </span>
            </li>
            <li className='indicator'>
              <span >
                &nbsp; Number (0-9)
              </span>
            </li>
            <li className='indicator'>
              <span >
                &nbsp; Special Character (!@#$%^&*)
              </span>
            </li>
            <li className='indicator'>
              <span >
                &nbsp; At least 6 Charcaters
              </span>
            </li>
          </ul>
        </div> */}

        <button className="--btn" >
          Register
        </button>
      </form>

    

    </div>
  )
}

export default StudentReg