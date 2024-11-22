
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const AdminModel = require("../models/AdminModel");



const protectAdmin = asyncHandler(async (req, res, next)=>{

  let token;
  if(
    (req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")) ||
    req.cookies.token  // for testing purposes, you can remove this line later. It's used to store the token in the browser's cookies.
  ){
  
    try{
      
      // console.log(req.cookies)
      
      token = req.headers?.authorization?.split(" ")[1] || req.cookies.token;
      // console.log(token)
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

      const foundAdmin =  await AdminModel.findById(decoded.id).select("-password")
      if(!foundAdmin){
        return res
        .status(401)
        .json({message: "Unauthorised, admin not found"});
        
      }
      req.adminId = decoded.id
    

      // if(!req.adminId){
      //   return res.status(401).json({message: "Unauthorized, user not found."});
      // }
      next()
    }
    catch(err){
      console.log(err);
      res.status(401).json({message: "Unauthorized, token failed"});
  }
}
if(!token){
  res.status(403).json({message: "Unauthorized, no token"})
}

})


module.exports = {protectAdmin}