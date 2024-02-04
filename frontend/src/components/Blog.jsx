import React from "react";
import Timeago from "react-timeago";
import { Link } from "react-router-dom";
import classes from "./Blog.module.css";

const Blog = ({ id, title, date, author, cat, content }) => {
  const storedUserID = localStorage.getItem("userID");
  return (
    <div className={classes.blog}>
      <Link to={`/posts/${id}`} className={classes.link}>
        <div className={classes.blog_title}>{title}</div>
        <div className={classes.blog_content}>{content}</div>
        <hr />
        <div className={classes.blog_detail}>
          <div className={classes.blog_author_detail}>By:{author}</div>
          Posted: <Timeago date={date}></Timeago>
        </div>
      </Link>
      <div className={classes.bottom}>
        <div className={classes.blog_cat}>#{cat}</div>
        {storedUserID === author && (
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

export default Blog;
