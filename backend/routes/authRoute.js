const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/api/v0/register", authController.register);
router.post("/api/v0/login", authController.login);

module.exports = router;
