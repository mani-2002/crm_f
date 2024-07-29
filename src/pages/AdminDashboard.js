// import React from "react";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//   };
//   return (
//     <div>
//       AdminDashboard
//       <Link to="/">
//         <button onClick={handleLogout}>Logout</button>
//       </Link>
//     </div>
//   );
// };

// export default AdminDashboard;

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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
