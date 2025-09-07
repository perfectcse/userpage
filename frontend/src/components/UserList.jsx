import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ reload }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(() => alert("Failed to load users"));
  }, [reload]);

  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} | {user.city} | {user.phone} | {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
