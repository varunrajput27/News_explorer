// routes/articles.js

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  createArticle,
  getSavedArticles,
  deleteArticle,
} = require("../controllers/articles");

router.use(auth); // Protected routes

router.post("/", createArticle);
router.get("/", getSavedArticles);
router.delete("/:id", deleteArticle);

module.exports = router;
