import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        userName,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);

      if (decodedToken.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
      setMessage(response.data.message);
      setUserName("");
      setPassword("");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn) {
        console.log("your session haven't expired yet... ");
      }
    });
  }, []);

  return (
    <div style={{ padding: "5vh" }}>
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
      <div style={{ textAlign: "center" }}>
        <h1>Login to Your Portal...</h1>
      </div>
      <div>
        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            flexDirection: "column",
          }}
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="Enter Username..."
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="form-control w-25"
          />
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control w-25"
          />
          <br />
          <input type="submit" className="btn btn-primary" />
          <br />
          {message && <p style={{ color: "red" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
