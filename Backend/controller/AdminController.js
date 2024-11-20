
const AdminModel = require("./../models/AdminModel");
const generateToken = require("./../utils/index");

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")

const register = asyncHandler(async (req, res)=>{
  try{
    const {fullname, email, password} = req.body;

    // check if all fields are provided
  
   if (!fullname || !email || !password){ 
      res.status(400);
      throw new Error("All fields are required")
    }else if(password.length < 6){
      res.status(400);
      throw new Error("Password should be at least 6 characters long")
    }

    // to throw error if email already exists
    const adminExists = await AdminModel.findOne({email});
    if(adminExists){
      res.status(400);
      throw new Error("Email already exists");
    }

    // to create a new admin in the database
    const admin = new AdinModel.create({fullname, email, password});

    // to generate a token for the admin
    const token = generateToken(admin._id);

    res.cookie("token", token,{
      path: "/",
      httpOnly: true,
      expires: new Date(Date,now() + 1000 + 86400),
      sameSite: "none",
      secure: true,

    })

    // send a success response with the admin details and token
    if(admin){
      const {_id, fullname, email, role} = admin;
      res.status(201).json({_id, fullname, email, role});
    }
    

  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


module.exports = {
  register,
}