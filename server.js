require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const accountRoutes = require("./routes/account.routes");
const bookRoutes = require("./routes/book.routes");

//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, res.method);
  next();
});

//routes
app.use("/api/accounts", accountRoutes);
app.use("/api/books", bookRoutes);

//connect database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewURLParser: true,
  })
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
