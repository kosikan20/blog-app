import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "../Blog";

import classes from "./MyPosts.module.css";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [myCurrentPage, setMyCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const storedUserID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const lastPage = parseInt(localStorage.getItem("myCurrentPage")) || 1;
    setMyCurrentPage(lastPage);
  }, []);

  useEffect(() => {
    !token && navigate("/");
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/v0/myposts/${storedUserID}?page=${myCurrentPage}`
        );
        if (response.data.totalPages === 0) {
          setTotalPages(0);
        } else {
          setPosts(response.data.posts);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [myCurrentPage, storedUserID, navigate, token]);

  useEffect(() => {
    localStorage.setItem("myCurrentPage", myCurrentPage);
  }, [myCurrentPage]);

  const goToNextPage = () => {
    setMyCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setMyCurrentPage((prevPage) => prevPage - 1);
  };

  return totalPages > 0 ? (
    <div>
      <div className={classes.bloglist}>
        {posts.map((post) => (
          <Blog
            key={post._id}
            title={post.title}
            content={post.content}
            author={post.userID}
            date={post.createdAt}
            cat="tech"
            id={post._id}
          ></Blog>
        ))}
        <div className={classes.pagination}>
          <button
            onClick={goToPrevPage}
            disabled={myCurrentPage === 1}
            className={classes.prevButton}
          >
            Previous
          </button>
          <span className={classes.pnumber}>
            {myCurrentPage} / {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={myCurrentPage === totalPages}
            className={classes.nextButton}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className={classes.noposts}> No Posts</div>
  );
};

export default MyPosts;
