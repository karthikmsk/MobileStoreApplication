import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import Navbar from "./Navbar";
import ProfileDetails from "./ProfileDetails";
import "../Styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();
  const maleUser = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515075/male_user_j3j9ii.jpg";

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
      const storedUser = localStorage.getItem("userName"); 
      const userId = localStorage.getItem("id");
      console.log("User ID : ", userId);
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
    <>
      <Navbar />
      
      <div className="profile-container">
        <div className="user">
          <div className="user-icon">
            <img src={maleUser} alt="User" />
            <p>Hello,</p>
            <div className="name">
              <p
                style={{
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "-10px",
                }}
              >
                {user.name}
              </p>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <div className="profile" >
            
              <img src="https://cdn-icons-png.flaticon.com/128/456/456283.png" alt="Profile Logo" />
              Profile
            
          </div>
          <div className="orders" onClick={() => navigate("/account/orders")}>
           
              <img src="https://cdn-icons-png.flaticon.com/128/6737/6737602.png" alt="Orders Logo" />
              Orders
           
          </div>
          <div className="address" onClick={() => navigate("/account/address")}>
            
              <img src="https://cdn-icons-png.flaticon.com/128/2838/2838912.png" alt="Address Logo" />
              Address
            
          </div>
          <div className="coupens">
           
              <img src="https://cdn-icons-png.flaticon.com/128/879/879767.png" alt="Coupons Logo" />
              Coupons
            
          </div>
          <div className="help">
           
              <img src="https://cdn-icons-png.flaticon.com/128/1660/1660114.png" alt="Help Logo" />
              Help
            
          </div>
          <div className="logout" onClick={handleLogout}>
              
                <img src="https://cdn-icons-png.flaticon.com/128/10405/10405584.png" alt="Logout Logo" />
                Logout
         </div>       
        </div>
     
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
          <p style={{fontSize:"14px"}}>Gender : </p>
          <div>
            <label style={{fontSize:"14px"}}>
              <input
                type="radio"
                value="MALE"
                checked={user.gender === "MALE"}
              />
              Male
            </label>
            <label style={{ marginLeft: "20px",fontSize:"14px" }}>
              <input
                type="radio"
                value="FEMALE"
                checked={user.gender === "FEMALE"}
              />
              Female
            </label>
          </div>
          </span>
          </div>
        </div>
    </>
  );
};

export default Profile;
