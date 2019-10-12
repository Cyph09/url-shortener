const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlShortenSchema = new Schema(
  {
    urlCode: String,
    shortUrl: {
      type: String,
      required: true
    },
    longUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UrlShorten", urlShortenSchema);
