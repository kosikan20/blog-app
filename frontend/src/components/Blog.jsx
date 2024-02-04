import React from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";

import { deleteUserID } from "../features/userIDSlice";
import classes from "./Blog.module.css";

const Blog = ({ id, title, date, author, cat, content }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedUserID = localStorage.getItem("userID");

  const postDeleteHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await axios.delete(`http://localhost:5500/api/v0/posts/${id}`);
      Swal.fire({
        title: "Post deleted",
        text: "your post deleted successfully and you'll be logged out for security purposes",
        iconColor: "green",
        icon: "success",
        confirmButtonText: "Close",
        confirmButtonColor: "green",
        allowOutsideClick: false,
      });
      localStorage.clear();
      dispatch(deleteUserID());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.blog}>
      <Link to={`/posts/${id}`} className={classes.link}>
        <div className={classes.blog_title}>{title}</div>
        <div className={classes.blog_content}>{content}</div>
        <hr />
        <div className={classes.blog_detail}>
          <div className={classes.blog_author_detail}>By:{author}</div>
          <div className={classes.blog_date_detail}>Posted:{format(date)}</div>
        </div>
        <div className={classes.blog_cat}>#{cat}</div>
      </Link>
      {storedUserID === author && (
        <div className={classes.blogButtons}>
          <Link to={`/update-post/${id}`}>
            <button className={classes.updateButton}>Update</button>
          </Link>
          <div>
            <button
              className={classes.deleteButton}
              onClick={postDeleteHandler}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
