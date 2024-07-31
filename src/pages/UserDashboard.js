import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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

  const [message, setMessage] = useState("");
  const sendMessage = (e) => {
    alert(message);
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
            <div style={{ height: "37.5vh" }}>1</div>
            <div
              style={{
                height: "7.5vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTop: "1px solid black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "84%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    className="form-control"
                    placeholder="Enter Your Message Here..."
                    style={{
                      borderRadius: "0 0 0 0",
                      height: "6.8vh",
                      border: "none",
                    }}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "16%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button className="btn" onClick={sendMessage}>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      style={{
                        color: "#ffffff",
                        borderRadius: "50%",
                        backgroundColor: "green",
                        padding: "2vh",
                        marginTop: "1px",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
