
import React, { useState } from 'react'
import './AdminPreview.css'
import UserTable from './UserTable';
import { CiSearch } from "react-icons/ci";

const userData = [
  {
    id: 1,
    name: 'Muby',
    email: 'muby@gmail.com',
    role: 'Admin'
  },
  {
    id: 2,
    name: 'Teddy',
    email: 'teddy@gmail.com',
    role: 'User'
  },
  {
    id: 3,
    name: 'OG',
    email: 'og@gmail.com',
    role: 'Member'
  },
  {
    id: 4,
    name: 'Chapo',
    email: 'chapo@gmail.com',
    role: 'Admin'
  },
  {
    id: 5,
    name: 'Opera',
    email: 'opera@gmail.com',
    role: 'User'
  },
  {
    id: 6,
    name: 'Rodiyat',
    email: 'rodiyat@gmail.com',
    role: 'Member'
  },
];

const AdminPreview = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(userData);
  const [filteredData, setFilteredData] = useState(userData)

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term)

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(term)
      || user.email.toLowerCase().includes(term)
      || user.role.toLowerCase().includes(term)

    )
    setFilteredData(filtered)
  }


  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)

    const updatedFilteredData = filteredData.filter((user) => user.id != userId);

    setFilteredData(updatedFilteredData)
  }

  const handleUpdateRole = (userId, newRole) => {
    const updatedRole = users.map((user) => user.id === userId ? { ...user, role: newRole } : user)

    setUsers(updatedRole)

    const updatedFilteredRole = filteredData.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    )

    setFilteredData(updatedFilteredRole)
  }

  return (
    <>
      <div className='__prevCon'>
        <h2 className="__prevHeader">Admin</h2>
        <div className="__prevSearchCon">
          <CiSearch className="__prevSearchIcon" />
          <input type="text" className='__prevSearch' placeholder='Searh by name, email or role' value={search}
            onChange={handleSearchChange} />
        </div>
        <div className='__prevList'>
          <UserTable data={filteredData} onDelete={handleDelete} onUpdateRole={handleUpdateRole} />
        </div>
        <div className='__inviteBtnCon'>
          <button className='__inviteBtn'>Invite Admin</button>
        </div>
      </div>
    </>
  )
}

export default AdminPreview;