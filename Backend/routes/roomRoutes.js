const express = require('express');
const router = express.Router();

const {createNewRoom} = require("../controller/RoomController");
const {getRoom} = require("../controller/RoomController");
const {getRooms} = require("../controller/RoomController");
const {deleteRoom} = require("../controller/RoomController");
const { protectAdmin } = require('../middleware/authmiddleware');

router.post("/create-room", protectAdmin, createNewRoom);
router.get("/get-rooms", protectAdmin, getRooms);
router.get("/:roomId", protectAdmin, getRoom);
router.get("/:roomId", protectAdmin, deleteRoom);

module.exports = router;