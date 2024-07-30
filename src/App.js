import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const PrivateRoute = ({ element }) => {
    const isAuthenticated = () => {
      return localStorage.getItem("token") !== null;
    };
    if (isAuthenticated) {
      return element;
    } else {
      return (
        <Navigate
          to="/login"
          state={{ message: "Please login first" }}
          replace
        />
      );
    }
  };
  return (
    <div>
      <Router>
        <nav
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Link to="/">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin-dashboard"
            element={<PrivateRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/user-dashboard"
            element={<PrivateRoute element={<UserDashboard />} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
