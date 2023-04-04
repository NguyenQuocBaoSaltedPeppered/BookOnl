const Author = require("../models/author.model");

const newAuthor = async (req, res) => {
  const { name } = req.body;
  try {
    const newAuthor = await Author.createnew(name);
    res.status(200).json({ newAuthor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { newAuthor };
