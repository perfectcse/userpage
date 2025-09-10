import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";

const UserList = ({ reload, onUserDeleted }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the backend
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

  // Handle delete operation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(() => {
          alert("User deleted successfully");
          setUsers(users.filter(user => user._id !== id));
          onUserDeleted(); // Optional callback to parent if needed
        })
        .catch(() => {
          alert("Failed to delete user");
        });
    }
  };

  return (
    <div className="userlist-container">
      <h2>Registered Users</h2>
      {loading ? (
        <div className="loading">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="no-users">No users found.</div>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id} className="user-item">
              <div><strong>Name:</strong> {user.name}</div>
              <div><strong>City:</strong> {user.city}</div>
              <div><strong>Phone:</strong> {user.phone}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
