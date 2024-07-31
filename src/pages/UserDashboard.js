import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserDashboard = () => {
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
            width: "80%",
            border: "1px solid black",
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <h3>Message us to Report a Problem...</h3>
          </div>
          <div
            style={{ border: "1px solid black", height: "45vh", width: "50vh" }}
          >
            chatbox
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
