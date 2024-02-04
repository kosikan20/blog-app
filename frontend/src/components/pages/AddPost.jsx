import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import classes from "./AddPost.module.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const userID = useSelector((state) => state.userID.userID);
  const storedUserID = localStorage.getItem("userID");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (!token) navigate("/");
  }, [navigate, userID, storedUserID]);

  const postSubmitHandler = (e) => {
    e.preventDefault();
    const addPost = async () => {
      try {
        await axios.post("http://localhost:5500/api/v0/posts", {
          title,
          content,
          userID,
        });
        Swal.fire({
          title: "Post successfull",
          text: "your post added successfully",
          iconColor: "green",
          icon: "success",
          confirmButtonText: "Close",
          confirmButtonColor: "green",
          allowOutsideClick: false,
        });
        navigate("/");
      } catch (error) {
        Swal.fire({
          title: "Request unsuccessful",
          text: error.message,
          iconColor: "red",
          icon: "error",
          confirmButtonText: "Close",
          confirmButtonColor: "red",
          allowOutsideClick: false,
        });
      }
    };
    addPost();
  };

  return (
    <div className={classes.addPostContainer}>
      <h1 className={classes.addPostTitle}>Add new Post</h1>
      <div>
        <form className={classes.addPostForm} onSubmit={postSubmitHandler}>
          <div className={classes.inputGroup}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="Add a title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className={classes.inputField}
              type="text"
              placeholder="Add a post"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className={classes.addButton} type="submit">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
