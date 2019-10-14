const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const validUrl = require("valid-url");

const router = express.Router();

const baseUrl = require("../config").BASE_URL;
const UrlShortenModel = require("../models/urlShorten");

router.get("/:code", async (req, res, next) => {
  // get url code
  // find the url by code from db and compare
  // if it exists/valid redirect to the longUrl
  // else throw an error/ return not found: 404
  const urlCode = req.params.code;
  try {
    const { longUrl } = await UrlShortenModel.findOne({ urlCode });
    if (!longUrl) {
      try {
        const error = new Error("Url not found");
        error.statusCode = 404;
        throw error;
      } catch (err) {
        next(err);
      }
    }
    console.log(longUrl);
    res.redirect(longUrl);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
});

router.post("/shorten", async (req, res, next) => {
  // get request body
  const { longUrl } = req.body;
  // validate base url
  if (!validUrl.isWebUri(baseUrl)) {
    // if not valid throw and error
    // else continue to validate long url
    try {
      const error = new Error("Base url is not valid.");
      error.statusCode = 404;
      throw error;
    } catch (err) {
      next(err);
    }
  }

  //   validate long url
  if (!validUrl.isWebUri(longUrl)) {
    try {
      const error = new Error("The original provided url is not valid");
      error.statusCode = 404;
      throw error;
    } catch (err) {
      next(err);
    }
  } else {
    try {
      let urlInfo = await UrlShortenModel.findOne({ longUrl });
      if (urlInfo) {
        res.status(200).json(urlInfo);
      } else {
        // generate url code
        const urlCode = shortid.generate();

        // construct short url using base url + url code
        const shortUrl = `${baseUrl}/${urlCode}`;

        urlInfo = new UrlShortenModel({
          urlCode,
          longUrl,
          shortUrl
        });
        await urlInfo.save();
        res
          .status(201)
          .json({ message: "Short url successfully created", urlInfo });
      }
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
});

module.exports = router;
