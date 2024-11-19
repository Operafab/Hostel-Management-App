import React, { useState } from "react";
import SideBar from "./SideBar";
import './DashBoard.css'
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPenFancy } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import UpdateStudentProfile from "../Modal/UpdateStudentProfile";
import ChangeStudentRoom from "../Modal/ChangeStudentRoom";
import UpdateCheckin from "../Modal/UpdateCheckin";

const studentData = [
    {
        id: 1,
        studentName: "Jessica Smith",
        email: "jessicasmith@gmail.com",
        idNumber: '12345',
        gender: "Female",
        age: "20",
        nationality: "American",
        guardianName: "Elon Musk",
        guardianEmail: "elonmusk@gmail.com"
    },
    {
        id: 2,
        studentName: "John Doe",
        email: "johndoe@gmail.com",
        gender: "Male",
        idNumber: '67890',
        age: "22",
        nationality: "British",
        guardianName: "Elyan Muskett",
        guardianEmail: "elyannmuskett@gmail.com"
    },
    {
        id: 3,
        studentName: "Maria Garcia",
        email: "mariagarcia@gmall.com",
        gender: "Female",
        idNumber: '54321',
        age: "25",
        nationality: "Spanish",
        guardianName: "Ekong Mike",
        guardianEmail: "ekongmike@gmail.com"
    },
    {
        id: 4,
        studentName: "Garcia Jons",
        email: "garciajons@gmall.com",
        gender: "Male",
        idNumber: '09876',
        age: "27",
        nationality: "German",
        guardianName: "Avalon Mushroom",
        guardianEmail: "avalonmushroom@gmail.com"
    },
];

const StudentDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState(studentData);
    const [filteredData, updateFilteredData] = useState(studentData);
    const [isSideBarToggled, setIsSideBarToggled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModal, setSelectedModal] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);


    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = students.filter((student) =>
            student.studentName.toLowerCase().includes(term) || student.email.toLowerCase().includes(term) || student.idNumber.includes(term)
        );
        updateFilteredData(filtered);
    };

    const handleDelete = (studentId) => {
        const updatedUsers = students.filter((student) => student.id !== studentId);
        setStudents(updatedUsers);
        const updatedFilterData = filteredData.filter((student) => student.id !== studentId);
        updateFilteredData(updatedFilterData);
    }

    const handleModalOpen = (students) => {
        setSelectedStudent(students)
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSelectedModal('')
        setSelectedStudent(null)
    }

    const handleModalSelect = (modalType) => {
        setSelectedModal(modalType)
    }

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete This Student',
            message: 'You really wanna delete this student? 🤔',
            buttons: [
                { label: 'Delete', onClick: () => handleDelete(id) },
                { label: 'Cancel', onClick: () => alert('Deletion Cancelled') }
            ]
        })
    }

    return (
        <div>
            {isSideBarToggled && (
                <div className="mobile-side-nav">
                    <SideBar />
                </div>
            )}
            <div className="--flex --overflow-hidden">

                <div className="desktop-side-nav">
                    <SideBar />
                </div>

                <div className="--flex-dir-column --overflow-y-auto --flex-One --overflow-x-hidden">

                    <main className="--flex-justify-center w-full">
                        
                        <div className="right dash-main">
                            <div className="--flex-justify-between">
                                <p>Students</p>
                                {isSideBarToggled ? (
                                    <IoCloseOutline className="sidebar-toggle-icon" onClick={() => setIsSideBarToggled(false)} />
                                ) : (<IoMenu className="sidebar-toggle-icon" onClick={() => setIsSideBarToggled(true)} />)}
                            </div>
                            <p>Search Students</p>
                            <input type="text" placeholder="Search by name, email or ID Number" className="search" value={searchTerm} onChange={handleSearchChange} />
                            <div className="table">
                                <table className="table_wrapper room-table">
                                    <thead className="table__head">
                                        <tr className="table__row">
                                            <th className="same_class">Student's Name</th>
                                            <th className="same_class">Email</th>
                                            <th className="same_class">ID Number</th>
                                            <th className="same_class">Gender</th>
                                            <th className="same_class">Age</th>
                                            <th className="same_class">Nationality</th>
                                            <th className="same_class">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="table__body">
                                        {filteredData.map((student, index) => (
                                            <tr key={index} className="table__row">
                                                <td className="same_class">{student.studentName}</td>
                                                <td className="same_class">{student.email}</td>
                                                <td className="same_class">{student.idNumber}</td>
                                                <td className="same_class">{student.gender}</td>
                                                <td className="same_class">{student.age}</td>
                                                <td className="same_class">{student.nationality}</td>
                                                <td className="same_class">
                                                    <RiDeleteBin6Line size={20} color="red" onClick={() => confirmDelete(student.id)} />
                                                    &nbsp;&nbsp;<FaPenFancy size={20} color="blue" onClick={() => handleModalOpen(student)} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Link to='/studentreg'>
                                <button className="btn-secondary">Add a student</button>
                            </Link>

                        </div>
                    </main>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Select An Option</h2>
                        <button className="one" onClick={() => handleModalSelect("UpdateStudentProfile")}>Update Student's Profile</button>
                        <button className="two" onClick={() => handleModalSelect('ChangeStudentRoom')}>Change Student's Room</button>
                        <button className="three" onClick={() => handleModalSelect('UpdateCheckin')}>Update Check In</button>
                        <button onClick={handleModalClose}>Close</button>
                    </div>
                </div>
            )}
            {selectedModal === "UpdateStudentProfile" && (<UpdateStudentProfile student={selectedStudent} updateFilteredData={updateFilteredData} onClose={handleModalClose} />)}
            {selectedModal === "ChangeStudentRoom" && (<ChangeStudentRoom student={selectedStudent} onClose={handleModalClose} />)}
            {selectedModal === "UpdateCheckin" && (<UpdateCheckin student={selectedStudent} onClose={handleModalClose} />)}
        </div>
    )
};

export default StudentDashboard;