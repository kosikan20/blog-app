import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

import classes from "./UpdatePost.module.css";

const UpdatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const userID = useSelector((state) => state.userID.userID);
  const storedUserID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/v0/posts/${id}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);

        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if (!token || storedUserID !== response.data.userID) navigate("/");
      } catch (error) {
        Swal.fire({
          title: "Request unsuccessful",
          text: "the post is not found",
          iconColor: "red",
          icon: "error",
          confirmButtonText: "Close",
          confirmButtonColor: "red",
          allowOutsideClick: false,
        });
        navigate("/");
      }
    };
    fetchPost();
  }, [id, navigate, userID, storedUserID]);

  const postUpdateHandler = (e) => {
    e.preventDefault();
    const updatePost = async () => {
      try {
        const response = await axios.put(
          `http://localhost:5500/api/v0/posts/${id}`,
          {
            title,
            content,
          }
        );
        setTitle(response.data.title || "");
        setContent(response.data.content || "");
        Swal.fire({
          title: "Post Updated",
          text: "post updated successfully",
          iconColor: "green",
          icon: "success",
          confirmButtonText: "Close",
          confirmButtonColor: "green",
          allowOutsideClick: false,
        });
        navigate(`/posts/${id}`);
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
    updatePost();
  };

  const postDeleteHandler = (e) => {
    e.preventDefault();
    const deletePost = async () => {
      try {
        await axios.delete(`http://localhost:5500/api/v0/posts/${id}`);
        Swal.fire({
          title: "Post deleted",
          text: "your post deleted successfully",
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
    deletePost();
  };

  return (
    <div className={classes.updatePostContainer}>
      <h1 className={classes.updatePostTitle}>Edit Post</h1>
      <div>
        <form className={classes.updatePostForm} onSubmit={postUpdateHandler}>
          <div className={classes.inputGroup}>
            <input
              className={classes.inputField}
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className={classes.inputField}
              type="text"
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className={classes.updateButton} type="submit">
            Update Post
          </button>
        </form>
      </div>
      <div>
        <form className={classes.deletePostForm} onSubmit={postDeleteHandler}>
          <button className={classes.deleteButton} type="submit">
            Delete Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
