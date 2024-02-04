const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router
  .route("/api/v0/posts")
  .post(postController.authenticateToken, postController.createPost)
  .get(postController.getAllPosts);

router.route("/api/v0/myposts/:userID").get(postController.getMyPosts);
router
  .route("/api/v0/posts/:id")
  .get(postController.getPost)
  .put(postController.authenticateToken, postController.updatePost)
  .delete(postController.authenticateToken, postController.deletePost);
router
  .route("/api/v0/posts/:id/like")
  .put(postController.authenticateToken, postController.likePost);
module.exports = router;
