import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import Profile from "./Profile";
import "../Styles/Profile.css";

const ProfileDetails = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log("Token : ", token);
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await UserAPI.getUserProfile(token);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const storedUser = localStorage.getItem("userName"); // optional
    if (token) {
      setIsLoggedIn(true);
      if (storedUser) setUserName(storedUser);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userName"); // optional
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <Profile />
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-header">Personal Information</div>

        <div className="form-group">
          <div className="input-container">
            <input type="text" name="name" value={user.name} required />
            <label>Name</label>
          </div>

          <div className="input-container">
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              required
            />
            <label>Phone</label>
          </div>
          <div className="input-container">
            <input type="text" name="email" value={user.email} required />
            <label>Email</label>
          </div>
        </div>

        <span>
          <p style={{ fontSize: "14px" }}>Gender : </p>
          <div>
            <label style={{ fontSize: "14px" }}>
              <input
                type="radio"
                value="MALE"
                checked={user.gender === "MALE"}
              />
              Male
            </label>
            <label style={{ marginLeft: "20px", fontSize: "14px" }}>
              <input
                type="radio"
                value="FEMALE"
                checked={user.gender === "FEMALE"}
              />
              Female
            </label>
          </div>
        </span>

        {/* {user.addresses && user.addresses.length > 0 ? (
            user.addresses.map((address, index) => (
              <div
                key={index}
                style={{ marginBottom: "10px", paddingLeft: "15px" }}
              >
                <p>
                  <strong>AddressType:</strong> {address.addressType}
                </p>
                <p>
                  <strong>Street:</strong> {address.street}
                </p>
                <p>
                  <strong>City:</strong> {address.city}
                </p>
                <p>
                  <strong>State:</strong> {address.state}
                </p>
                <p>
                  <strong>Zipcode:</strong> {address.zipCode}
                </p>
                <hr style={{ width: "80%" }} />
              </div>
            ))
          ) : (
            <p>No addresses found.</p>
          )} */}
      </div>
    </div>
  );
};
export default ProfileDetails;
