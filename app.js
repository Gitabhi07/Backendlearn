const { log } = require("console");
const express = require("express");
const morgan = require("morgan");
const app = express();
const userModel = require("./models/user");
const dbConnection = require("./config/db");

app.use(morgan("dev"));

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = await userModel.create({
    username: username,
    email: email,
    password: password,
  });
  res.send(newUser);
});

app.get("/update-user", (req, res) => {
  userModel.findOneAndUpdate(
    {
      username: "Abhishek Yadav",
    },
    {
      email: "abhi.yadav.370k@gmail.com",
    }
  );
  res.send("User Update");
});

// Delete

app.get("/delete-user", async (req, res) => {
  await userModel.findOneAndDelete({
    username: "a",
  });

  res.send("user Deleted");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

// find
app.get("/get-users", (req, res) => {
  userModel.find({ username: "Abhi" }).then((users) => {
    res.send(users);
  });
});

app.post("/get-form-data", (req, res) => {
  console.log(req.body);
  res.send("data recived");
});

app.listen(3030);
