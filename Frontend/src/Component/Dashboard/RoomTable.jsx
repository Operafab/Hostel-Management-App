import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import AddRoomModal from './AddRoomModal';
import EditStatusModal from './EditStatusModal';

const RoomTable = ({rooms, onDeleteRoom, OnUpdateRoom, onAddRoom}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleEditClick = (room) => {
        setSelectedRoom(room);
        setIsEditModalOpen(true)
    }
    
    const handleEditModalClose = () => {
        setIsEditModalOpen(true)
        setSelectedRoom(null);
    }

    const handleAddRoomOpen = () => {
        setIsAddModalOpen(true)
    }

    const handleAddRoomClose = () => {
        setIsAddModalOpen(false)
    }

  return (
    <div>
        <h2>Available Rooms</h2>
        <div className="table">
                <table className="table_wrapper room-table">
                  <thead className="table__head">
                    <tr className="table__row">
                      <th className="same_class">Room Number</th>
                      <th className="same_class">Capacity</th>
                      <th className="same_class">Occupancy</th>
                      <th className="same_class">Location</th>
                      <th className="same_class">Status</th>
                      <th className="same_class">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="table__body">
                    {rooms.map((room, index) => (
                      <tr key={index} className="table__row">
                        <td className="same_class">{room.roomNumber}</td>
                        <td className="same_class">{room.roomCapacity}</td>
                        <td className="same_class">{room.roomOccupancy.length}</td>
                        <td className="same_class">{room.roomLocation}</td>
                        <td className="same_class">{room.roomStatus}</td>
                        <td className="same_class"><FaPen size={20} color="blue" className='_noBg' onClick={() => handleEditClick(room)}/>
                            &nbsp;&nbsp;<RiDeleteBin6Line size={20} color="red" className='_noBg' onClick={() => onDeleteRoom(room._id)}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="right">
                <button className="btn-secondary" onClick={handleAddRoomOpen}>Add New Room</button>
                {isAddModalOpen && (<AddRoomModal onAddRoom={onAddRoom} onClose={handleAddRoomClose}/>)}
                {isEditModalOpen && (<EditStatusModal room={selectedRoom} OnUpdateRoom={OnUpdateRoom} onClose={handleEditModalClose}/>)}
              </div>
    </div>
  )
}

export default RoomTable;