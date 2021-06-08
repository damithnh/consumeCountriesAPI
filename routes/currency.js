const express = require("express");
const router = express.Router();
const oboe = require("oboe");

function getByValue(map, searchValue) {
    let list = [];
    for (let [key, value] of map.entries()) {
      if (value === searchValue) list.push(key);
    }
    return list;
  }
  
router.get("/", async (req, res) => {
    let map = new Map();
    oboe("https://restcountries.eu/rest/v2/all")
      .node("currencies.*", function (currency) {
        if (map.has(currency.name)) {
          map.set(currency.name, 2);
        } else {
          map.set(currency.name, 1);
        }
      })
      .done(function () {
        res.send(getByValue(map, 2));
      });
  });

  module.exports = router;