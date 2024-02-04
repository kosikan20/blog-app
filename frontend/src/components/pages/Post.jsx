import React, { useEffect, useState } from "react";
import Timeago from "react-timeago";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import classes from "./Post.module.css";

const Post = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
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
    return () => {
      console.log("fetchPosts cleanup");
    };
  }, [id]);

  return (
    <div className={classes.blog}>
      <div className={classes.blog_title}>{post.title}</div>
      <div className={classes.blog_content}>{post.content}</div>
      <hr className={classes.hr} />
      <div className={classes.blog_detail}>
        <div className={classes.blog_author_detail}>By:{post.userID}</div>
        <div className={classes.blog_date_detail}>
          Posted: <Timeago date={post.createdAt}></Timeago>
        </div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.blog_cat}>#tech</div>
        {storedUserID === post.userID && (
          <div className={classes.blogButtons}>
            <Link to={`/update-post/${id}`}>
              <button className={classes.updateButton}>Edit</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
