const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const validUrl = require("valid-url");

const router = express.Router();

const urlShortenModel = require("../models/urlShorten");

router.get("/", (req, res) => {
  res.send("Hello!");
});

router.post('/shorten', (req, res) => {
    res.json({longUrl:'Original url', shortUrl:'Shorten url'});
} )

module.exports = router;
