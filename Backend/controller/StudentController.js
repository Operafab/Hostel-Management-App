const asynchandler = require("express-async-handler");
const Student = require("../models/StudentModel");
const Room = require("../models/RoomModel");

const date = new Date();
const formatDate = (input) => {
  return input > 9 ? input : `0${input}`;
};

const formatHour = (input) => {
  return input > 12 ? input - 12 : input;
};

const format = {
  dd: formatDate(date.getDate()),
  mm: formatHour(date.getMonth() + 1),
  yyyy: formatDate(date.getFullYear()),

  HH: formatDate(date.getHours()),
  hh: formatDate(formatHour(date.getHours())),

  MM: formatDate(date.getMinutes()),
  SS: formatDate(date.getSeconds()),
};

const format24Hour = ({ dd, mm, yyyy, HH, MM, SS }) => {
  return `${mm}/${dd}/${yyyy} ${HH}:${MM}:${SS}`;
};

const registerStudent = asynchandler(async (req, res) => {
  try {
    const { email, name, age, nationality, g_name, g_email, gender, roomNum } =
      req.body;
    if (
      !email ||
      !name ||
      !age ||
      !nationality ||
      !g_name ||
      !g_email ||
      !gender ||
      !roomNum
    ) {
      return res
        .status(404)
        .json({ message: "Please fill in all reqwuired fields" });
    }

    const studentExist = await Student.findOne({ email });
    if (studentExist) {
      return res.status(400).json({ message: "Student already exist" });
    }

    const room = await Room.findOne({ roomNumber: roomNum });
    if (!room) {
      return res.status(404).json({ message: "Room not Found" });
    }

    if (room.roomStatus !== "available") {
      return res.status(400).json({ message: "Room is not available" });
    }

    const student = await Student.create({
      email,
      name,
      age,
      nationality,
      guardian: {
        guardianName: g_name,
        guardianEmail: g_email,
      },
      gender,
      room: room._id,
      checkedIn: true,
      checkedInTime: new Date(),
    });

    room.roomOccupancy.push(student._id);

    if (room.roomOccupancy.length >= room.roomCapacity) {
      room.roomStatus = "unavailable";
    }

    await room.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getAllStudents = asynchandler(async (req, res) => {
  try {
    const students = await Student.find().sort("-createdAt");
    if (!students) {
      return res.status(404).json({ message: "No students found" });
    }
    res.status(200).json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getStudent = asynchandler(async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (student) {
      res.status(200).json(student);
    } else {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateStudentProfile = asynchandler(async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { name, age, nationality, g_name, g_email } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    student.name = name || student.name;
    student.age = age || student.age;
    student.nationality = nationality || student.nationality;
    student.guardian.guardianName = g_name || student.guardian.guardianName;
    student.guardian.guardianEmail = g_email || student.guardian.guardianEmail;

    const updatedStudent = await student.save();
    res.status(200).json(updatedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const changeStudentRoom = asynchandler(async (req, res) => {
  const { studentId, newRoomNum } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Remove current student from list of students in the current room
    const currentRoom = await Room.findById(student.room);
    currentRoom.roomOccupancy = currentRoom.roomOccupancy.filter((occupant) => {
      occupant.toString() != studentId;
    });
    // console.log({currentRoom})

    // if length of current is less than its capacity, change its status
    if (currentRoom.roomOccupancy.length < currentRoom.roomCapacity) {
      currentRoom.roomStatus = "available";
    }

    await currentRoom.save();
    const newRoom = await Room.findOne({ roomNumber: newRoomNum });
    if (!newRoom) {
      return res.status(404).json({ message: "New room not Found" });
    }
    if (newRoom.roomStatus !== "available") {
      return res.status(400).json({ message: "New room is not available" });
    }
    student.room = newRoom._id;
    newRoom.roomOccupancy.push(student._id);
    if (newRoom.roomOccupancy.length >= newRoom.roomCapacity) {
      newRoom.roomStatus = "unavailable";
    }
    await newRoom.save();
    await student.save();
    res
      .status(200)
      .json({ message: "Room changed successfully", student, newRoom });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateCheckInStatus = asynchandler(async (req, res) => {
  try {
    const { studentId, action, roomNumber } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      res.status(404).json({ message: "Student not found" });
    }

    if (action === "checkedIn") {
      student.checkedIn = true;
      student.checkedInTime = format24Hour(format);
    } else if (action === "checkedOut") {
      student.checkedIn = false;
      student.checkedOutTime = format24Hour(format);
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const room = await Room.findOne({ roomNumber });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (action === "checkedIn") {
      room.roomOccupancy.push(studentId);

      await room.save();
      await student.save();
      return res
        .status(200)
        .json({ message: "Student checked in successfully" });
    } else if (action === "checkedOut") {
      const filteredStudent = room.roomOccupancy.filter((stdId) => {
        stdId != studentId;
      });
      room.roomOccupancy = filteredStudent;
      await room.save();
      await student.save();

      return res
        .status(200)
        .json({ message: "Check-in status updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteStudent = asynchandler(async (req, res) => {
  try {
    const { studentId } = req.params;

    // const student = await Student.findByIdAndDelete(studentId);
    const student = await Student.findById(studentId);
   

    if (!student) {
      return res
        .status(404)
        .json({ message: "Invalid credentials or student not found" });
    }
      const studentRoom = await Room.findById(student.room);
    if(studentRoom && student){
      studentRoom.roomOccupancy = studentRoom.roomOccupancy.filter((occupant) => 
        occupant.toString() != studentId
      );
      await studentRoom.save();
      await student.save();

     return  res.status(200).json({ message: "Student deleted successfully" });
    } 
    else{
      return res.status(400).json({ message: "Bad Request" });
    }
   

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = {
  registerStudent,
  getAllStudents,
  getStudent,
  updateStudentProfile,
  changeStudentRoom,
  updateCheckInStatus,
  deleteStudent,
};