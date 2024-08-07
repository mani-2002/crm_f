import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const socket = io("http://localhost:3001", {
  withCredentials: true,
});

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [imageSrc, setImageSrc] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      const decodedToken = jwtDecode(token);
      const loggedInUser = decodedToken.userName;

      const fetchLoggedInUserDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/user_data/${loggedInUser}`
          );
          setImageSrc(response.data.image);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };

      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/admin_messages"
          );
          setNotifications(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchLoggedInUserDetails();
      fetchMessages();
    }
  }, [navigate, token]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      console.log("Received message:", message);
      setNotifications((prevNotifications) => [message, ...prevNotifications]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "5vh" }}>
            Admin Dashboard
          </div>
        </div>
        <div
          style={{
            width: "10%",
            height: "10vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="User"
              style={{
                width: "9vh",
                height: "9vh",
                margin: "2vh",
                borderRadius: "50%",
              }}
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
      </div>
      <div style={{ display: "flex", width: "90%" }}>
        <div
          style={{
            width: "20%",
            border: "1px solid black",
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Link to="/" className="btn btn-success w-50 m-3">
            Back to Home...
          </Link>
          <button onClick={handleLogout} className="btn btn-danger w-50 m-3">
            Logout
          </button>
        </div>
        <div
          style={{
            width: "20%",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          chats
        </div>
        <div
          style={{
            width: "60%",
            border: "1px solid black",
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>
                  From: {notification.from}
                  <br />
                  Message: {notification.message}
                  {/* Adjust based on actual structure */}
                </li>
              ))}
            </ul>
          ) : (
            <div>No notifications</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
