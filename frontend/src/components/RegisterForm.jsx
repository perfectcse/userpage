import React, { useState } from "react";
import axios from "axios";

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
    } catch {
      alert("Error registering user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
