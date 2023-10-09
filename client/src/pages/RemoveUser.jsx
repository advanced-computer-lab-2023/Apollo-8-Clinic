// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RemoveUser() {
 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/admin/getUsers')
      .then((response) => {
        console.log('Response:', response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []); 
 
  const handleDeleteUser = async (username) => {
    try {
      const response = await axios.delete(`http://localhost:8000/admin/removeUser`, {
        data: { username },  
      });
      if (response.data && response.data.message === 'The User removed successfully') {
        setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  

  return (
   <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
    <div className="w-50">
    <div className="bg-white p-3 rounded w-30">
        <h2>  Users List</h2>
    <table className="table">
        <thead>
            <tr>
                <th>
                    Username
                </th>
                <th>
                    Type
                </th>
            </tr>
        </thead>
        <tbody>
        {users.length > 0 ? (
    users.map((user) => (
      <tr key={user.username}>
        <td>{user.username}</td>
        <td>{user.type}</td>
        <td> 
          <button onClick={() => handleDeleteUser(user.username)}>
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">No users found</td>
    </tr>
  )}
            
        </tbody>
    </table>
   </div>
   </div>
   </div>
  );
}

export default RemoveUser;