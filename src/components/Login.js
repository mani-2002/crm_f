import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        userName,
        password,
      });
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
        setRole(response.data.user[0].role);
      }
    });
  }, []);
  return (
    <div style={{ border: "1px solid black" }}>
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
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <input type="submit" />
        <br />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
