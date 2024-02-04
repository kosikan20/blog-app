const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

const authenticateToken = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.json({
        status: 401,
        message: "login before posting anything",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const freshUser = await userModel.findById(decoded.userID);
    if (!freshUser) {
      return res.json({
        status: 401,
        message: "user not exist",
      });
    }
    req.user = freshUser;
    console.log(req.user);
    next();
  } catch (err) {
    return res.json({
      status: 401,
      message: err.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (req.user._id.toString() === post.userID) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post has been updated");
    } else {
      return res.status(403).json("You can update only your post");
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (req.user._id.toString() === post.userID) {
      await post.deleteOne();
      res.status(200).json("post has been deleted");
    } else {
      return res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
const getPost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    if (req.body.userID != req.user._id) {
      return res.json({
        status: 401,
        message: "userID and token userID didn't match",
      });
    }
    const post = await postModel.create(req.body);
    res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.likes.includes(req.body.uid)) {
      await post.updateOne({ $pull: { likes: req.body.uid } });
      return res.status(200).json({ post, message: "post  unliked" });
    }
    await post.updateOne({ $push: { likes: req.body.uid } });
    res.status(200).json({ post, message: "post  liked" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const postsPerPage = 10;
    const page = req.query.page || 1;
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = page * postsPerPage;
    const posts = await postModel.find().sort("-createdAt");
    const paginatedPosts = posts.slice(startIndex, endIndex);
    res.status(200).json({
      posts: paginatedPosts,
      totalPages: Math.ceil(posts.length / postsPerPage),
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const postsPerPage = 10;
    const page = req.query.page || 1;
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = page * postsPerPage;
    const userID = req.params.userID;
    const posts = await postModel.find({ userID }).sort("-createdAt");
    if (posts.length == 0) {
      return res.status(200).json({
        posts: "No Posts",
        totalPages: 0,
      });
    }
    const paginatedPosts = posts.slice(startIndex, endIndex);
    return res.status(200).json({
      posts: paginatedPosts,
      totalPages: Math.ceil(posts.length / postsPerPage),
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = {
  updatePost,
  deletePost,
  getPost,
  createPost,
  authenticateToken,
  likePost,
  getAllPosts,
  getMyPosts,
};
