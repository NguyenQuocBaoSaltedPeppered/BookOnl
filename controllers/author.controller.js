const authorService = require("../services/author.services");
const authorController = {
  //get all author
  getAll: async (req, res) => {
    try {
      const authorsList = await authorService.getAllAuthors();
      res.status(200).json({ authorsList });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //create new author
  newAuthor: async (req, res) => {
    const { name } = req.body;

    try {
      const newAuthor = await authorService.createAuthor(name);
      res.status(200).json({ newAuthor });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = authorController;
