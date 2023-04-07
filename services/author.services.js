const Author = require("../models/author.model");

const authorService = {
  //get all authors
  getAllAuthors: async () => {
    try {
      const authorsList = await Author.find();
      return authorsList;
    } catch (error) {
      console.log(error);
    }
  },

  //create
  createAuthor: async (name) => {
    if (!name) {
      throw Error("Please field the name field!");
    }
    const isExisted = await Author.findOne({ name: name });
    if (isExisted) {
      throw Error("Author already existed");
    }
    //add doc to Db
    try {
      const newAuthor = await Author.create({ name });
      return newAuthor;
    } catch (error) {
      console.log(error);
    }
  },

  //get AuthorId in Db, if Db don't have, create one
  getAuthorId: async (name) => {
    const isAuthorExisted = await Author.findOne({ name: name });
    if (!isAuthorExisted) {
      const newAuthor = await Author.create({ name: name });
      return newAuthor._id;
    }
    return isAuthorExisted._id;
  },
};

module.exports = authorService;
