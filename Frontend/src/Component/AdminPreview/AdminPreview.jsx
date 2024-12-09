import React, { useEffect, useState } from "react";
import "./AdminPreview.css";
import UserTable from "./UserTable";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

// const adminData = [
//   {
//     id: 1,
//     name: 'Muby',
//     email: 'muby@gmail.com',
//     role: 'Admin'
//   },
//   {
//     id: 2,
//     name: 'Teddy',
//     email: 'teddy@gmail.com',
//     role: 'Admin'
//   },
//   {
//     id: 3,
//     name: 'OG',
//     email: 'og@gmail.com',
//     role: 'Member'
//   },
//   {
//     id: 4,
//     name: 'Chapo',
//     email: 'chapo@gmail.com',
//     role: 'Admin'
//   },
//   {
//     id: 5,
//     name: 'Opera',
//     email: 'opera@gmail.com',
//     role: 'Admin'
//   },
//   {
//     id: 6,
//     name: 'Rodiyat',
//     email: 'rodiyat@gmail.com',
//     role: 'Member'
//   },
// ];

const AdminPreview = () => {
  const [search, setSearch] = useState("");
  const [admins, setAdmins] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin",{withCredentials:true});
        const data = response.data;
        setFilteredData(data);
        setAdmins(data);
        console.log({ data });
      } catch (error) {
        console.log({ error });
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);

    const filtered = admins.filter(
      (admin) =>
        admin.fullname.toLowerCase().includes(term) ||
        admin.email.toLowerCase().includes(term) ||
        admin.role.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleDelete = async (adminId) => {
    console.log
    try {
      await axios.delete(`http://localhost:5000/admin/${adminId}`, {
        withCredentials: true,
      });
      const updatedFilteredData = filteredData.filter(
        (admin) => admin._id != adminId
      );

      setFilteredData(updatedFilteredData);
      toast.success("Admin deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUpdateRole = async (adminId, newRole) => {
    try {
      await axios.patch(
        `http://localhost:5000/admin/${adminId}`,
        { role: newRole },
        { withCredentials: true }
      );

      const updatedFilteredRole = filteredData.map((admin) =>
        admin._id === adminId ? { ...admin, role: newRole } : admin
      );

      setFilteredData(updatedFilteredRole);
      toast.success("Admin updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) {
    <ClipLoader color="#3a86ff" cssOverride={override} loading={isLoading} />;
  }

  return (
    <>
      <div className="__prevCon">
        <h2 className="__prevHeader">Admin</h2>
        <div className="__prevSearchCon">
          <CiSearch className="__prevSearchIcon" />
          <input
            type="text"
            className="__prevSearch"
            placeholder="Searh by name, email or role"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="__prevList">
          <UserTable
            data={filteredData}
            onDelete={handleDelete}
            onUpdateRole={handleUpdateRole}
          />
        </div>
        <div className="__inviteBtnCon">
          <button className="__inviteBtn">Invite Admin</button>
        </div>
      </div>
    </>
  );
};

export default AdminPreview;
