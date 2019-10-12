const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");

const app = express();

// Middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require("./routes/urlShorten"));

// Error handling middleware

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
