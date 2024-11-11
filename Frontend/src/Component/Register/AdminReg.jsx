
import React from 'react'
import "./Register.css"



const AdminReg = () => {
  return (
    <div className='container form__ --100vh'>
      <p  className='title'>Create Account</p>
      <form className='form'>

        <div className='--dir-column'>
          <label htmlFor="fullname">Full Name : </label>
          <input type="text" className='input' name='fullname' placeholder='Enter your Full name' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="email">Email : </label>
          <input type="email" className='input' name='email' placeholder='Enter your email' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="password">Password : </label>
          <input type="password" className='input' name='passsword1' placeholder='Enter your password' required />
        </div>

        <div className='--dir-column'>
          <label htmlFor="password">Confirm Password: </label>
          <input type="text" className='input' name='password2' placeholder='Enter your password' required />
        </div>

        <div className="card">

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
                &nbsp; At least 6 Characters
              </span>
            </li>
          </ul>
        </div>
        <button className="--btn" >
          Signing you up..." : "Create Account
        </button>
      </form>

      <p>Already have an account ? 
        {/* <Link to="/login" >Login</Link>  */}
      </p>

    </div>
  )
}

export default AdminReg