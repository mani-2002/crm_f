import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
          <button style={{ width: "80%" }} className="btn btn-primary m-1">
            1
          </button>
          <button style={{ width: "80%" }} className="btn btn-primary m-1">
            1
          </button>
          <button style={{ width: "80%" }} className="btn btn-primary m-1">
            1
          </button>
          <button style={{ width: "80%" }} className="btn btn-primary m-1">
            1
          </button>
          <button style={{ width: "80%" }} className="btn btn-primary m-1">
            1
          </button>
          <button style={{ width: "80%" }} className="btn btn-primary m-1">
            1
          </button>
          <button style={{ width: "80%" }} className="btn btn-primary m-1">
            1
          </button>
          <button style={{ width: "80%" }} className="btn btn-primary m-1">
            1
          </button>
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
          View Messages
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
