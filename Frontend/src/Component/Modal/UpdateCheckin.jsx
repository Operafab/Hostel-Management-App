import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
// import StudentDashboard from '../Dashboard/StudentDashBoard';

const UpdateCheckin = ({ student, onClose, currentRoomNumber }) => {
  const [action, setAction] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(student);

  const handleRoomChange = (e) => {
    setRoomNumber(e.target.value);
  };
  const handleActionChange = (e) => {
    setAction(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try { 
      const response = await axios.post(
        "http://localhost:5000/student/check-in-status",
        {
          studentId: student._id,
          action,
          roomNumber: student?.room?.roomNumber,
        },
        { withCredentials: true }
      );
      console.log(response);
      toast.success(response?.data?.message);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Check-In Status</h2>
        <p>
          Current Status : {student.checkedIn ? "Checked In" : "Checked Out"}
        </p>

        <p> Current Room : {currentRoomNumber || "Not assigned"}</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Room Number</label>
            <input
              type="number"
              value={currentRoomNumber || roomNumber}
              onChange={handleRoomChange}
              placeholder="Enter room number"
            />
          </div>

          <div>
            <label htmlFor="">Action</label>
            <select value={action} onChange={handleActionChange}>
              <option value="&nbsp;"> Select an Action</option>
              <option value="checkedIn" disabled={student.checkedIn}>
                Check In
              </option>
              <option value="checkedOut" disabled={!student.checkedIn}>
                Check Out
              </option>
            </select>
          </div>

          <button type="submit">
            {isSubmitting ? "Updating..." : "Update Status"}{" "}
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCheckin;
