import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ChangeStudentRoom = ({ student, onClose }) => {
  const [newRoomNum, setNewRoomNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log(student)

  const handleChange = (e) => {
    setNewRoomNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const studentId = student?._id;
      const response = await axios.put(
        `${BASE_URL}/student/change-room`,
        { studentId: studentId, newRoomNum },
        { withCredentials: true }
      );
      console.log(response);
      toast.success(response?.data?.message);
      onClose()
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      // toast.error('Error changing room')
    }finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Change Student&apos;s Room</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label> New Room Number </label>
            <input type="text" value={newRoomNum} onChange={handleChange} />
          </div>

          <button type="submit"> {isSubmitting? "Changing...":"Change Room"}</button>
          <button type="button" onClick={onClose}>
            {" "}
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeStudentRoom;
