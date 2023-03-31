require("dotenv").config();
const express = require("express");
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
app.use("/api/books", bookRoutes);

//listen
app.listen(process.env.PORT, () => {
  console.log("listening on port: ", process.env.PORT);
});
