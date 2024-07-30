import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        mobileNumber,
        userName,
        password,
      });
      console.log(response);
      setMessage(response.data.message);
      setMobileNumber("");
      setUserName("");
      setPassword("");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div style={{ border: "1px solid black", padding: "5vh" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Register Your Company here...</h1>
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
          onSubmit={handleRegister}
        >
          <input
            type="tel"
            placeholder="Enter Mobile Number..."
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
            maxLength="10"
            className="form-control w-25"
          />
          <br />
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
          <input type="submit" className="btn btn-success" />
          <br />
          {message && <p style={{ color: "red" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
