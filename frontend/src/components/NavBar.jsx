import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { deleteUserID } from "../features/userIDSlice";
import Swal from "sweetalert2";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const userID = useSelector((state) => state.userID.userID);
  const [storedUserID, setStoredUserID] = useState(
    localStorage.getItem("userID") || ""
  );
  const dispatch = useDispatch();

  return (
    <div className={classes.navContainer}>
      <Link to="/" className={classes.navLink}>
        Home
      </Link>
      {userID || storedUserID ? (
        <>
          <Link to="/myposts" className={`${classes.navLink}  `}>
            My Posts
          </Link>
          <Link to="/add-post" className={classes.navLink}>
            Add New Post
          </Link>

          <div
            className={`${classes.navLink} ${classes.lastLink} `}
            id={classes.logout}
            onClick={() => {
              localStorage.clear();
              dispatch(deleteUserID());
              setStoredUserID("");
              Swal.fire({
                title: "loggout successfull",
                text: "you'll be redirected to home page ",
                iconColor: "green",
                icon: "success",
                confirmButtonText: "Close",
                confirmButtonColor: "green",
                allowOutsideClick: false,
              });
              navigate("/");
            }}
          >
            Logout
          </div>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className={`${classes.navLink} ${classes.lastLink} `}
          >
            Login
          </Link>
          <Link to="/register" className={`${classes.navLink}  `}>
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
