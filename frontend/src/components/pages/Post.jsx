import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import { deleteUserID } from "../../features/userIDSlice";
import classes from "./Post.module.css";

const Post = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedUserID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/api/v0/posts/" + id
        );
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [id, navigate]);
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
      dispatch(deleteUserID());
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.blog}>
      <div className={classes.blog_title}>{post.title}</div>
      <div className={classes.blog_content}>{post.content}</div>
      <hr className={classes.hr} />
      <div className={classes.blog_detail}>
        <div className={classes.blog_author_detail}>By:{post.userID}</div>
        <div className={classes.blog_date_detail}>
          Posted: {format(post.createdAt)}
        </div>
      </div>
      <div className={classes.blog_cat}>#tech</div>
      {storedUserID === post.userID && (
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

export default Post;
