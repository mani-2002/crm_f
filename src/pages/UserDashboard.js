// import React from "react";
// import { Link } from "react-router-dom";

// const UserDashboard = () => {
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//   };
//   return (
//     <div>
//       UserDashboard
//       <Link to="/">
//         <button onClick={handleLogout}>Logout</button>
//       </Link>
//     </div>
//   );
// };

// export default UserDashboard;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      UserDashboard
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
