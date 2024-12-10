import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { FaBars, FaTimes } from "react-icons/fa";
import RoomTable from "./RoomTable";
import "./DashBoard.css"
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";


// const roomsData = [
//   {
//     _id: 1,
//     roomNumber: 10,
//     roomCapacity: 5,
//     roomOccupancy: ["Ade", "Mubarak", "Chapo", "Rodiyat"],
//     roomLocation: "No 5, Ado Odo",
//     roomStatus: "Available",
//   },
//   {
//     _id: 2,
//     roomNumber: 20,
//     roomCapacity: 4,
//     roomOccupancy: ["Shola", "Adigun", "Tunubu", "Sakariyau"],
//     roomLocation: "No 2, Ikeshi",
//     roomStatus: "Unavailable",
//   },
//   {
//     _id: 3,
//     roomNumber: 30,
//     roomCapacity: 6,
//     roomOccupancy: ["Shade", "John"],
//     roomLocation: "No 3, Obasanjo",
//     roomStatus: "Available",
//   },
// ];

const override = {
  display: "block",
  margin: "100px auto",
};

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Room = () => {
  const [roomData, setRoomData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSideBarToggle, setIsSideBarToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/room/`, {
          withCredentials: true,
        });
        const data = response.data;
        console.log({ data });
        setRoomData(data);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          toast.error("Cannot fetch Room");
        } else {
          toast.error("Internal server error");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const filteredRooms = roomData.filter((res) => {
      const roomLocation = res.roomLocation?.toLowerCase() || "";
      const roomStatus = res.roomStatus?.toLowerCase() || "";
      const roomNumber = res.roomNumber || "";
      return (
        roomLocation.includes(search.toLowerCase()) ||
        roomStatus.includes(search.toLowerCase()) ||
        roomNumber.includes(search)
      );
    });
    setSearchResult(filteredRooms);
  }, [roomData, search]);

  const handleAddRoom = async (newRoomData) => {
    try {
      await axios.post(
        `${BASE_URL}/room/create-room`,
        { ...newRoomData, roomNum: newRoomData.roomNumber },
        { withCredentials: true }
      );
      setRoomData((prevData) => [...prevData, newRoomData]);
      toast.success("Room added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUpdateRoom = async (updatedRoomData) => {
    try {
      await axios.patch(
        `${BASE_URL}/room/update-room/${updatedRoomData._id}`,
        { roomStatus: updatedRoomData.roomStatus },
        { withCredentials: true }
      );
      setRoomData((prevData) =>
        prevData.map((room) =>
          room._id === updatedRoomData._id ? updatedRoomData : room
        )
      );
      toast.success("Room status updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const removeRoom = async (id) => {
    console.log({ id });
    try {
      const response = await axios.delete(`${BASE_URL}/room/${id}`, {
        withCredentials: true,
      });
      setRoomData((prevData) => prevData.filter((room) => room._id !== id));
      toast.success("Room deleted successfully");
    } catch (error) {
      console.error("Failed to delete room", error);
      toast.error("Failed to delete room");
    }
  };

  const confirmDelete = (_id) => {
    confirmAlert({
      title: "delete this room",
      message: "Are you sure you want to delete this room",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeRoom(_id),
        },

        {
          label: "Cancel",
          onClick: () => alert("Deletion cancelled"),
        },
      ],
    });
  };

  if (isLoading)
    return (
      <ClipLoader color="#3a86ff" cssOverride={override} loading={isLoading} />
    );

  return (
    <div>
      <div>
        {isSideBarToggle && (
          <div className="mobile-side-nav">
            <SideBar />
          </div>
        )}
        <div className="--flex-justify-between">
          <div className="desktop-side-nav">
            <SideBar />
          </div>
          <div className="--flex-dir-column --overflow-y-auto --flex-One --overflow-x-hidden">
            <main className="--flex-justify-center w-full ">
              <div className="right dash-main">
                <div className="--flex-justify-between">
                  <h1>Hostel Room Listing</h1>
                  {isSideBarToggle ? (
                    <FaTimes
                      className="sidebar-toggle-icon"
                      onClick={() => setIsSideBarToggle(false)}
                    />
                  ) : (
                    <FaBars
                      className="sidebar-toggle-icon"
                      onClick={() => setIsSideBarToggle(true)}
                    />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Search by room number, status or location"
                  className="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <RoomTable
                  rooms={searchResult}
                  onAddRoom={handleAddRoom}
                  onUpdateRoom={handleUpdateRoom}
                  onDeleteRoom={confirmDelete}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
