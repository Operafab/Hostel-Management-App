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

});

const getRoom = asynchandler(async(req, res) => {
  try {
    const { _id: roomId} = req.params;
    const room = await Room.findById(roomId);
    if(!room){
      res.status(404).json({message:"Invalid request or room does not exist"});
    }
    res.status(200).json(room);
  } catch (err) {
    console.log(err)
  }
});

const getRooms = asynchandler(async(req, res) => {
  try {
    const rooms = await Room.find().sort();
    if(!rooms){
      res.status(404).json({message:" Invalid request"})
    }
    res.status(200).json(rooms);
  } catch (err) {
    console.log(err)
  }
});

const deleteRoom = asynchandler(async(req, res) => {
  try {
    const { _id: roomId} = req.params;
    
    const roomTobeDeleted = await Room.findByIdAndDelete(roomId)
    if(!roomTobeDeleted){
      res.status(404).json({message:"Invalid request or room does not exist"});
    }

    res.status(204).json({message:"Room deleted successfully"});
  } catch (err) {
    res.status(500).json({message:"Internal Server Error"});
  }
})

module.exports = {createNewRoom, getRoom, getRooms, deleteRoom};