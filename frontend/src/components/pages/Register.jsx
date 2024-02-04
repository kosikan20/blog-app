import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import classes from "./Register.module.css";
import { addUserID } from "../../features/userIDSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const register = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5500/api/v0/register",
          {
            username,
            email,
            password,
          }
        );
        // Store token in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userID", response.data.data._id);
        dispatch(addUserID(response.data.data._id));
        Swal.fire({
          title: "Registration done",
          text: "you are registerd sucessfully",
          iconColor: "green",
          icon: "success",
          confirmButtonText: "Close",
          confirmButtonColor: "green",
          allowOutsideClick: false,
        });
        navigate("/add-post");
      } catch (error) {
        Swal.fire({
          title: "Registration Unsuccessfull",
          text: "your inputs unsuccessfully meet the validation",
          iconColor: "red",
          icon: "error",
          confirmButtonText: "Close",
          confirmButtonColor: "red",
          allowOutsideClick: false,
        });
      }
    };
    register();
  };

  return (
    <div className={classes.registerContainer}>
      <form className={classes.registerForm} onSubmit={handleSubmit}>
        <h2 className={classes.formTitle}>Register</h2>
        <div className={classes.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={classes.linkContainer}>
          <Link className={classes.link} to="/login">
            already have an account? Click here
          </Link>
        </div>
        <button type="submit" className={classes.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
