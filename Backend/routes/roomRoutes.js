const express = require('express');
const router = express.Router();

const {createNewRoom,getRoom, getRooms, deleteRoom, updateRoom} = require("../controller/RoomController");
const { protectAdmin } = require('../middleware/authmiddleware');

router.post("/create-room", protectAdmin, createNewRoom);
router.get("/", protectAdmin, getRooms);
router.get("/:roomId", protectAdmin, getRoom);
router.patch("/update-room/:roomId", protectAdmin, updateRoom);
router.delete("/:roomId", protectAdmin, deleteRoom);

module.exports = router;