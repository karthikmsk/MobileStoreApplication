import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setname] = useState("");
  const homeIcon = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515071/Home_sm1jjp.png";
  const logout = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515075/logout_wyprun.png";
  const userIcon = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515083/User_pqyw4e.png";
  const cartIcon = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515081/Shopping_cart_tisb2s.png";
  const wishlistIcon = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515084/wishlist_yj4xxj.png";
  const searchIcon = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515080/search_tkkflt.png";
  const orderIcon = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515078/package_av1mi4.png";
  const pinIcon = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515079/pin_vdmrq5.png";
  const profileIcon = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515079/profile_bgd8vm.png";
  const heartIcon = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515071/Heart_ncexdq.png";
  const logo = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515074/logo_jl1o0d.png";
  
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const storedUser = localStorage.getItem("name"); 
    if (token) {
      setIsLoggedIn(true);
      if (storedUser) setname(storedUser);
    } else {
      setIsLoggedIn(false);
      setname("");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector(".user-container");
      if (dropdown && !dropdown.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setDropdownVisible(false);
    navigate("/login");
  };

  return (
    <div className="nav navbar-height">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Fonibay" />
        <div style={{ fontSize: "2rem", display: "flex", gap: "5px" }}>
          <span>F</span>
          <span>O</span>
          <span>N</span>
          <span>E</span>
          <span style={{ color: "yellow" }}>B</span>
          <span style={{ color: "yellow" }}>A</span>
          <span style={{ color: "yellow" }}>Y</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search">
        <input type="text" placeholder="Search..." />
        <img src={searchIcon} alt="Search" />
      </div>

      {/* Icons */}
      <div className="icons">
        <img src={homeIcon} onClick={() => navigate("/")} alt="Home" />
        <div className="user-container" onClick={toggleDropdown}>
          <img src={userIcon} alt="User" />
          {dropdownVisible && (
            <div className="dropdown-menu-container">
              {!isLoggedIn ? (
                <p onClick={() => navigate("/login")}>
                  <span>
                    <img src={profileIcon} alt="login" />
                  </span>
                  Login
                </p>
              ) : (
                <>
                  {name && (
                    <p
                      className="greeting"
                      style={{ fontWeight: "bold", paddingLeft: "10px" }}
                    >
                      👋 Hi, {name}
                    </p>
                  )}
                  <p
                    onClick={() => {
                      console.log("Navigating to profile");
                      navigate("/profile");
                    }}
                  >
                    <span>
                      <img src={profileIcon} alt="profile" />
                    </span>
                    Profile
                  </p>

                  <p onClick={() => navigate("/account/address")}>
                    <span>
                      <img src={pinIcon} alt="address" />
                    </span>
                    Address
                  </p>
                  <p onClick={() => navigate("/account/orders")}>
                    <span>
                      <img src={orderIcon} alt="orders" />
                    </span>
                    Orders
                  </p>
                  <p onClick={() => navigate("/account/wishlist")}>
                    <span>
                      <img src={wishlistIcon} alt="wishlist" />
                    </span>
                    WishLists
                  </p>
                  <p onClick={handleLogout}>
                    <span>
                      <img src={logout} alt="logout" />
                    </span>
                    Logout
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        <img
          src={heartIcon}
          onClick={() => navigate("/account/wishlist")}
          alt="Wishlist"
        />
        <img
          src={cartIcon}
          onClick={() => navigate("/account/cart")}
          alt="Cart"
        />
      </div>
    </div>
  );
};

export default Navbar;
