const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
//Require Route Handlers
const users = require("./routes/api/users");
const login = require("./controllers/login");
const fileUpload = require('express-fileupload');
//Middleware
app.use(bodyParser.json());

//Getting Mongo's connection URI
const db = require("./config/keys").mongoURI;

//Connecting to MongoDB
mongoose
  .connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

//production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  //Homepage
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
} else {
  app.get("/", (req, res) => res.send("Welcome to Switch Me Backend"));
}
app.use(fileUpload());
// Handling 404
app.use("/api/users", users);
app.put("/login", login.login);
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));