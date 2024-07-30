import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      AdminDashboard
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
