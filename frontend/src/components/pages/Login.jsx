import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import { addUserID } from "../../features/userIDSlice.js";
import classes from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5500/api/v0/login", {
        username,
        password,
      });
      // Store token in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userID", response.data.data._id);
      Swal.fire({
        title: "Login done",
        text: "you are logged in",
        iconColor: "green",
        icon: "success",
        confirmButtonText: "Close",
        confirmButtonColor: "green",
        allowOutsideClick: false,
      });
      navigate("/add-post");
      dispatch(addUserID(response.data.data._id));
    } catch (error) {
      Swal.fire({
        title: "Login Unsuccessfull",
        text: "User not found",
        iconColor: "red",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "red",
        allowOutsideClick: false,
      });
    }
  };

  return (
    <div className={classes.loginContainer}>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <h2 className={classes.formTitle}>Login</h2>
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
          <Link className={classes.link} to="/register">
            don't have an account? Click here
          </Link>
        </div>
        <button type="submit" className={classes.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
