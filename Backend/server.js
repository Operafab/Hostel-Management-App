
require("dotenv").config()
const mongoose = require("mongoose")
const connectDb = require("./config/db")
const errorHandler = require("./middleware/errormiddleware")
const express = require("express");
const cors = require("cors")
const app = express();
const adminRoutes = require("./routes/AdminRoutes") 

const PORT = 5000

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next)=>{
  res.header("Access-control-Allow-Origin");
  next()
});

app.use("/admin/", adminRoutes);


app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true,
  optionsSuccessStatus:200,
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD,OPTIONS"
}))


app.get("/", (req, res)=>console.log("Hello Teddy!"))

connectDb();

app.use(errorHandler);

mongoose.connection.once("open",()=>{
  console.log("Connected to Database");
  app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
  })
})