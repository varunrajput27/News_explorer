// controllers/articles.js

const Article = require("../models/Article");

module.exports.createArticle = async (req, res) => {
  
  const owner = req.user._id; // Auth middleware se
  const {
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
  } = req.body;

  try {
    const article = await Article.create({
      keyword,
      title,
      description,
      publishedAt,
      source,
      url,
      urlToImage,
      owner,
    });
    res.status(201).send(article);
  } catch (err) {
    
  console.error("Error creating article:", err);  // 👈 Add this
  res.status(400).send({ message: "Error saving article", error: err.message });


  }
};

module.exports.getSavedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.send(articles);
  } catch (err) {
    res.status(500).send({ message: "Error fetching articles" });
  }
};

module.exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article || article.owner.toString() !== req.user._id) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.send({ message: "Article deleted" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting article" });
  }
};
