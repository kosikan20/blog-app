import React, { useEffect, useState } from "react";
import axios from "axios";

import Blog from "../Blog";
import classes from "./BlogList.module.css";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const lastPage = parseInt(localStorage.getItem("currentPage")) || 1;
    setCurrentPage(lastPage);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/v0/posts?page=${currentPage}`
        );
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
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
            disabled={currentPage === 1}
            className={classes.prevButton}
          >
            Previous
          </button>
          <span className={classes.pnumber}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
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

export default BlogList;
