import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import Navbar from "./Navbar";
import "../Styles/Address.css";

const Address = () => {
  const maleUser = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515075/male_user_j3j9ii.jpg";
  const more = "https://res.cloudinary.com/du6xftpht/image/upload/v1746515076/more_bqtied.png";
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressType: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
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

  const deleteAddress = async (addressId) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("You need to be logged in to delete an address.");
      return;
    }

    try {
      const response = await UserAPI.deleteAddressByUserId(addressId); // Corrected line
      if (response.status === 204) {
        // 204 No Content is the typical response for successful deletion
        setUser((prevUser) => ({
          ...prevUser,
          addresses: prevUser.addresses.filter(
            (address) => address.id !== addressId
          ),
        }));
        alert("Address deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 10);
      } else {
        alert("Failed to delete the address. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("An error occurred while deleting the address. Please try again.");
    }
  };

  const handleAddressDelete = (addressId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (confirmDelete) {
      deleteAddress(addressId);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const storedUser = localStorage.getItem("userName");
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
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleAddAddressClick = () => {
    setShowAddAddressForm(!showAddAddressForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const [errors, setErrors] = useState({});

  const handleSaveAddress = async () => {
    const newErrors = {};
    if (!newAddress.addressType)
      newErrors.addressType = "Address type is required.";
    if (!newAddress.street.trim()) newErrors.street = "Street is required.";
    if (!newAddress.city.trim()) newErrors.city = "City is required.";
    if (!newAddress.state.trim()) newErrors.state = "State is required.";
    if (!newAddress.zipCode.trim()) newErrors.zipCode = "Zip code is required.";
    if (!newAddress.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed to save the address
    try {
      const userId = user.id;
      const response = await UserAPI.addAddressByUserId(userId, newAddress);
      if (response.status === 200 || response.status === 201) {
        const updatedAddresses = user.addresses
          ? [...user.addresses, newAddress]
          : [newAddress];
        setUser({ ...user, addresses: updatedAddresses });
        setShowAddAddressForm(false);
        setNewAddress({
          addressType: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          phoneNumber: "",
        });
        setErrors({});
        alert("Address saved successfully!");
      } else {
        alert("Failed to save the address. Please try again.");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("An error occurred while saving the address. Please try again.");
    }
  };

  return (
    <div>
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
          <div className="profile" onClick={() => navigate("/profile")}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/456/456283.png"
              alt="Profile Logo"
            />
            Profile
          </div>
          <div className="orders" onClick={() => navigate("/account/orders")}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/6737/6737602.png"
              alt="Orders Logo"
            />
            Orders
          </div>
          <div className="address" onClick={() => navigate("/account/address")}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/2838/2838912.png"
              alt="Address Logo"
            />
            Address
          </div>
          <div className="coupens">
            <img
              src="https://cdn-icons-png.flaticon.com/128/879/879767.png"
              alt="Coupons Logo"
            />
            Coupons
          </div>
          <div className="help">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1660/1660114.png"
              alt="Help Logo"
            />
            Help
          </div>
          <div className="logout" onClick={handleLogout}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/10405/10405584.png"
              alt="Logout Logo"
            />
            Logout
          </div>
        </div>
        <div className="address-container">
          <div className="address-header">
            <h3>Manage Addresses</h3>
          </div>
          <div className="add-address" onClick={handleAddAddressClick}>
            <span style={{ marginRight: "10px" }}>+</span>
            <span>Add New Address</span>
          </div>
          {showAddAddressForm && (
            <div className="add-address-form">
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={newAddress.street}
                required
                onChange={handleInputChange}
                style={{ borderColor: errors.street ? "red" : "initial" }}
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={newAddress.city}
                required
                onChange={handleInputChange}
                style={{ borderColor: errors.city ? "red" : "initial" }}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={newAddress.state}
                required
                onChange={handleInputChange}
                style={{ borderColor: errors.state ? "red" : "initial" }}
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={newAddress.zipCode}
                required
                onChange={handleInputChange}
                style={{ borderColor: errors.zipCode ? "red" : "initial" }}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={newAddress.phoneNumber}
                required={true}
                onChange={handleInputChange}
                style={{ borderColor: errors.phoneNumber ? "red" : "initial" }}
              />
              <div className="radio-group">
                Address type
                <span
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <input
                      type="radio"
                      name="addressType"
                      value="HOME"
                      onChange={handleInputChange}
                    />
                    Home
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <input
                      type="radio"
                      name="addressType"
                      value="WORK"
                      onChange={handleInputChange}
                    />
                    Work
                  </label>
                </span>
              </div>

              <div className="save-button">
                <button
                  style={{ paddingLeft: "10px" }}
                  onClick={handleSaveAddress}
                >
                  Save{" "}
                </button>
              </div>
              <div className="cancel-button">
                <button onClick={() => setShowAddAddressForm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
          {user.addresses && user.addresses.length > 0 ? (
            user.addresses.map((address, index) => (
              <div
                className="address-details"
                key={index}
                style={{ marginBottom: "10px", paddingLeft: "15px" }}
              >
                <div className="more" onClick={toggleDropdown}>
                  <img src={more} />
                  {dropdownVisible && (
                    <div className="dropdown-buttons">
                      <p
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the click event from bubbling up to the dropdown toggle

                          handleAddressDelete(address.addressId);
                        }}
                      >
                        Edit
                      </p>
                     
                      <p
                        onClick={(e) => {
                          e.stopPropagation();

                          handleAddressDelete(address.addressId);
                        }}
                      >
                        Delete
                      </p>
                    </div>
                  )}
                </div>
                {/* <button onClick={() => handleAddressDelete(address.addressId)}>
                  Delete
                </button> */}
                <div className="address-type">
                  <p>{address.addressType}</p>
                  </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginTop:"10px"
                  }}
                >
                  <span>{user.name}</span>
                  <span>{user.phoneNumber}</span>
                </div>

                <div className="address-info">
                  <p>
                    {address.street}, {address.city}
                  </p>
                  <p>
                    {address.state}, {address.zipCode}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No addresses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
