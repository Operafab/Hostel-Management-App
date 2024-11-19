const jwt = require("jsonwebtoken");

const generateToken = (id) =>{
  const token = jwt.sign({id}, process.env.ACCES_TOKEN, {expiresIn: "1d"})
  return token


}

module.exports =generateToken