import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css"; // Create this CSS file

const UserList = ({ reload }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load users");
        setLoading(false);
      });
  }, [reload]);

  return (
    <div className="userlist-container">
      <h2>Registered Users</h2>
      {loading ? (
        <div className="loading">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="no-users">No users found.</div>
      ) : (
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index} className="user-item">
              <div><strong>Name:</strong> {user.name}</div>
              <div><strong>City:</strong> {user.city}</div>
              <div><strong>Phone:</strong> {user.phone}</div>
              <div><strong>Email:</strong> {user.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
