const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser } = require("../controllers/authController");
const auth = require("../middlewares/auth");

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/users/me", auth, getUser);

module.exports = router;
