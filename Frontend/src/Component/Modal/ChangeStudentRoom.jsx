import React, { useState } from 'react'

const ChangeStudentRoom = ({student, onClose}) => {
  const [newRoomNum, setNewRoomNumber] = useState('')

  const handleChange = () =>{
    setNewRoomNumber(e.target.value)
  };

  const handleSubmit = () => {};

  return (
    <div className='modal'>
      <div className="modal-content">
        <h2>Chnage Student&apos;s Room</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label> New Room Number </label>
            <input type="text" value={newRoomNum} onChange={handleChange} />
          </div>


          <button type='submit'> Chnage Room</button>
          <button type='button' onClick={onClose}> Close</button>
        </form>

      </div>
    </div>
  )
}

export default ChangeStudentRoom