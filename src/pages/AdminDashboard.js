import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  withCredentials: true,
});

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  //for web sockets
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      console.log("Received message:", message);
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
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
