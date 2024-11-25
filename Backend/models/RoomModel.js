const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNumber:{
    type: Number,
    required: true,
    unique: true,
  },
  roomCapacity:{
    type: Number,
    required:true,
  },
  roomCapacity:[
    {
      type:String,
      ref: "Student",
    }
  ]
})