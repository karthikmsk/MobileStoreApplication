import axios from "axios";

const API_BASE_URL = "http://localhost:8080/user-service/api/users";

const UserAPI = {

getUserProfile: (token) => {
    return axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  
    
    getAddressById: (userId) => axios.get(`${API_BASE_URL}/addresses/${userId}`),
    addAddressByUserId:(userId,address) => axios.post(`${API_BASE_URL}/addresses/${userId}`,address,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      }, 
    }),
    editAddressByUserId:(userId) => axios.put(`${API_BASE_URL}/addresses/${userId}`),

    deleteAddressByUserId:(addressId) => axios.delete(`${API_BASE_URL}/addresses/${addressId}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      }, 
    })

    
}


export default UserAPI;