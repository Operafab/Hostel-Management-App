const asynchandler = require("express-async-handler");
const Room = require("../models/RoomModel");

const createNewRoom = asynchandler(async(req, res) => {
  const  {roomNum, roomCapacity, roomLocation} = req.body

  try{
    if(!roomNum || !roomCapacity || !roomLocation){
      return res.status(400).json({message: "All the fields are required"})
    }

    const roomExist = await Room.findOne({roomNumber:roomNum});
    if (roomExist){
    return res.status(400).json({message: "Room already exists"})
   }
   


    const room = await Room.create({
      roomNumber: roomNum,
      roomCapacity,
      roomLocation,
    });
    res.status(201).json(room);



  }catch(err){
    console.error(err)
    res.status(500).json({message:"Internal Server Error"});
  }

})

module.exports = {createNewRoom};