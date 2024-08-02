import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import { jwtDecode } from "jwt-decode";

const UserDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://crmb.onrender.com/user_message", {
        message,
        token,
      });
      setMessageStatus(response.data.message);
      setMessage("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const [userToAdminMessages, setUserToAdminMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://crmb.onrender.com/user_messages",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setUserToAdminMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [message]);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userToAdminMessages]);
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
      <div>Loggedin User : {userName}</div>
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
            <div style={{ height: "37.5vh", overflowY: "auto" }}>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Messages in this chat are end to end encrypted
              </div>
              {userToAdminMessages.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  No previous messages
                </div>
              ) : (
                userToAdminMessages.map((message) => {
                  const date = new Date(message.msg_date_and_time);
                  const hours = date.getHours().toString().padStart(2, "0");
                  const minutes = date.getMinutes().toString().padStart(2, "0");
                  const formattedTime = `${hours}:${minutes}`;
                  return (
                    <div
                      key={message.id}
                      style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        margin: "3px",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>
                        {message.message}
                      </div>
                      <div style={{ fontSize: "9px" }}>{formattedTime}</div>
                    </div>
                  );
                })
              )}
              <style>
                {`
      /* Scrollbar styling for WebKit browsers */
      div::-webkit-scrollbar {
        width: 8px; /* Adjust width */
      }

      div::-webkit-scrollbar-track {
        background: #f1f1f1; /* Track color */
      }

      div::-webkit-scrollbar-thumb {
        background: #888; /* Scrollbar color */
        border-radius: 10px; /* Rounded corners */
      }

      div::-webkit-scrollbar-thumb:hover {
        background: #555; /* Hover color */
      }
    `}
              </style>
              <div ref={messagesEndRef} />
            </div>
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
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <form
                  onSubmit={sendMessage}
                  style={{ display: "flex", width: "100%" }}
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
                      value={message}
                      required
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
                    <button className="btn" type="submit">
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{ position: "fixed", top: "20px", right: "20px" }}
      >
        <Toast.Body>{messageStatus}</Toast.Body>
      </Toast>
    </div>
  );
};

export default UserDashboard;
