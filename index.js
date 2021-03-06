const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const config = require("./config");

const app = express();

// Middleware
// View engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Render view
app.get("/", (req, res) => {
  res.render("index", { title: "URL Shortener" });
});


// Routes
app.use("/api/shorturl/", require("./routes/urlShorten"));

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

// Server & mongodb connection
app.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// initialize db
const db = mongoose.connection;
db.on("error", err => {
  console.log(err);
});

// Handle opening of data
db.once("open", () => {
  console.log(`Server running at port ${config.PORT}`);
});
