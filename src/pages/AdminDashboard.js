import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import io from "socket.io-client";

// Initialize socket connection
const socket = io("https://crmb.onrender.com", {
  withCredentials: true,
});

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token on component mount
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    // Handle socket connection and incoming messages
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("receiveMessage", (message) => {
      console.log("Received Message:", message);
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receiveMessage");
      socket.off("connect_error");
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
      {loading ? (
        <div>Loading...</div>
      ) : (
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
            {/* Placeholder for chat buttons if needed */}
            <div>Chats</div>
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
                    Message: {notification.message.body}{" "}
                    {/* Adjust based on actual structure */}
                  </li>
                ))}
              </ul>
            ) : (
              <div>No notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
