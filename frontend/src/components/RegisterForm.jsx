import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css"; // Make sure this CSS file is created

const RegisterForm = ({ onRegister }) => {
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", form);
      alert("User registered successfully!");
      setForm({ name: "", city: "", phone: "", email: "" });
      onRegister();
    } catch (error) {
      console.error(error);
      alert("Error registering user");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="input-group">
          <label>City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input
            name="phone"
            type="tel"
            pattern="[0-9]{10}"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
          <small>Format: 10 digits only</small>
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
