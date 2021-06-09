const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const oboe = require("oboe");
const axios = require('axios');

function searchJSON(content, key, value) {
    let result = [];
    for (let i in content) {
      if (content[i][key] == value) {
        result.push(content[i]);
      }
    }
    return result;
}

function getRegionCountries(data, region) {
    console.log('getting region countries')
    const countryList = searchJSON(data, "region", region);
  
    let map = new Map();
    countryList.forEach((country) => {
      map.set(country.name, country.population);
    });
  
    const sorted = new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
    console.log(sorted);
    return sorted;
  }

router.get("", async (req, res) => {
  let region = req.query.region;
  region = region.charAt(0).toUpperCase() + region.slice(1);
  const apiURL = `https://restcountries.eu/rest/v2/all`;
  const options = {
    method: "GET",
    };
  const response = await fetch(apiURL, options)
      .then((res) => res.json())
      // .then((res.json()) => console.log(res.json())
      //.then(res.send(getRegionCountries(await response, 'asia')))
      .catch((e) => {
      console.error({
          error: e,
      });
      });
  // console.log("RESPONSE: ", response);
  let testVar = await getRegionCountries(response, region);
  const obj = Object.fromEntries(testVar);
  // let testVar = await testAsync1(response, 'region', 'Asia');
  console.log(testVar);
  // return testVar;
  res.json(obj);
});

module.exports = router;