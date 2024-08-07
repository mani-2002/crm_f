import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("mobileNumber", mobileNumber);
    formData.append("userName", userName);
    formData.append("password", password);
    if (file) {
      formData.append("file", file);
    }
    try {
      const response = await axios.post(
        "https://crm-b-zs7s.onrender.com/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setMobileNumber("");
      setUserName("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "5vh" }}>
      <nav
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link to="/" className="btn btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success">
            Signup
          </Link>
        </div>
      </nav>
      <div style={{ textAlign: "center" }}>
        <h1>Register here...</h1>
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
            className="form-control w-50"
          />
          <br />
          <input
            type="text"
            placeholder="Enter Username..."
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="form-control w-50"
          />
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control w-50"
          />
          <br />
          <input
            type="file"
            className="form-control w-50"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <br />
          <button type="submit" className="btn btn-success">
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Register"
            )}
          </button>
          <br />
          {message && <p style={{ color: "red" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
