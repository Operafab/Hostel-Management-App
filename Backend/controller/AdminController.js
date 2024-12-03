
const AdminModel = require("./../models/AdminModel");
const generateToken = require("./../utils/index");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs")



const register = asyncHandler(async (req, res)=>{
  try{

    // destructuring the schema as the request body
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
     return  res.status(400).json({msg: "Email already exists"});
    }

    // to create a new admin in the database
    const admin = await AdminModel.create({fullname, email, password});

    // to generate a token for the admin
    const token = generateToken(admin._id);

    res.cookie("token", token,{
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 + 86400),
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
    res.status(500).send("Internal Server Error");
  }
});

const login = asyncHandler(async (req, res)=>{
  try{
    const {email, password} = req.body;
    let admin = await AdminModel.findOne({email});

    // check if the Admin exists
    if(!admin){
      return res.status(404).json({message: "Admin Not Found"});
    }
    // to check if password match
    const isMatch = await bcrypt.compare(password,admin.password)
if(!isMatch){
  return res.status(404).json({message: "Invalid Credentials"});

}

const token  = generateToken(admin._id);
  res.cookie("token", token,{
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 + 86400),
    sameSite: "none",
    secure: true,

  })
  const {_id,fullname,role} = admin;
  res.status(201).json(
   { _id,
    fullname,
    email,
    role,
    token,}

  )
    
  }catch(err){
    console.error(err);
    res.status(500).send("Internal Server Error: " + err)
  }
});

const getAdmin = asyncHandler( async (req, res)=>{
  try{
    const {adminId} = req.params;
    console.log("req admin Id =", req.adminId)
    // find admin by id
    const admin = await  AdminModel.findById(adminId);
    if(admin){
      const {_id, fullname, email, role} = admin;
      res.status(200).json({_id, fullname, email, role});
    }else{
      res.status(404).json({message: "Admin Not Found"})
    }
  } catch(err){
    console.error(err);
    res.status(500).send("Internal Server Error: " + err)
  }
})

// get details of all admins
const getAdmins = asyncHandler(async(req,res)=>{
  try{
    const admins = await AdminModel.find()
    .sort("-createAt")
    .select("-password");

    if(!admins){
      return res.status(404).json({message: "No admin found"});
    }
    res.status(200).json(admins);
  }catch(error){
    console.log(error)
  }
});

const updateAdmin = asyncHandler(async(req,res)=>{

  const {adminId} = req.params
  const {role} = req.body

  try{
    const admin = await AdminModel.findById(adminId)
    if(!admin){
      return res.status(404).json({message: "Admin not found"});
    }
    admin.role = role;
    await admin.save();
    res.status(200).json(admin);
  }catch(err){
    console.log(err);
    res.status(500).send("Internal Server Error: " + err)
  }
});

// function to delete admin
const deleteAdmin = asyncHandler(async (req, res) => {
  try{
    const {adminId} = req.params;
    const admin = await AdminModel.findById(adminId);
    if(!admin){
      res.status(404)
      throw new Error("Admin not found");
    }
    await admin.deleteOne();
    res.status(200).json({message:"Admin deleted successfully"});
    
  }catch(err){
    console.log (err.message)
    res.status(500).json({errorMessage: err.message })
  }
});

// function to log out admin
const adminLogout = asyncHandler(async(req, res)=>{
  res.cookie("token", " ", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({message: "Logged out successfully"})
})

module.exports = { register, login, getAdmin, getAdmins, updateAdmin, deleteAdmin, adminLogout}