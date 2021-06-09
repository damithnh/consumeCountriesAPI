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
  
  function preZero(num) {
    return num < 10 ? "0" + num : num;
  }
  
  function calculateTimeDiff(data, country1, country2) {
    let map = new Map();
    const c1 = searchJSON(data, "alpha3Code", country1);
    const c2 = searchJSON(data, "alpha3Code", country2);
  
    // console.log(c1[0]['timezones']);
    // console.log(c2[0]['timezones']);
  
    let t1 = c1[0]["timezones"].toString().split("UTC")[1];
    let t2 = c2[0]["timezones"].toString().split("UTC")[1];
  
    let t3 = t1.substring(1).split(":");
    let t4 = t2.substring(1).split(":");
  
    if (
      (t1.includes("+") && t2.includes("+")) ||
      (t1.includes("+") && t2.includes("+"))
    ) {
      console.log("both have same sign");
  
      let date1 = "2019/10/01" + parseInt(t3[0]) + ":" + parseInt(t3[1]) + ":00";
      let date2 = "2019/10/01" + parseInt(t4[0]) + ":" + parseInt(t4[1]) + ":00";
  
      const diffInMilliseconds = Math.abs(new Date(date1) - new Date(date2));
      // console.log(preZero(Math.floor(diffInMilliseconds / (1000 * 60 * 60))));
      // console.log(preZero(diffInMilliseconds / (1000 * 60 * 60) - Math.floor(diffInMilliseconds / (1000 * 60 * 60)))*60);
      
      if (diffInMilliseconds / (1000 * 60) >= 60) {
        // console.log(
        //   `${preZero(Math.floor(diffInMilliseconds / (1000 * 60 * 60)))}`
        // );
        return `${preZero(
          Math.floor(diffInMilliseconds / (1000 * 60 * 60))
        )}:${preZero((diffInMilliseconds / (1000 * 60 * 60) - Math.floor(diffInMilliseconds / (1000 * 60 * 60)))*60)}`;
      } else {
      // console.log(preZero(diffInMilliseconds / (1000 * 60) + " mins"));
      return `${preZero(diffInMilliseconds / (1000 * 60))} mins`;
      }
    } else {
      console.log("both have differenct signs");
  
      let hours = parseInt(t3[0]) + parseInt(t4[0]);
      let minutes = parseInt(t3[1]) + parseInt(t4[1]);
  
      console.log(`${preZero(hours)}:${preZero(minutes)}`);
      return `${preZero(hours)}:${preZero(minutes)}`;
    }
  }

router.get("", async (req, res) => {
  let c1alpha3Code = req.query.country1;
  let c2alpha3Code = req.query.country2;

  const apiURL = `https://restcountries.eu/rest/v2/all`;
  const options = {
    method: "GET",
  };
  const response = await fetch(apiURL, options)
    .then((res) => res.json())
    .catch((e) => {
      console.error({
        error: e,
      });
    });
  // console.log("RESPONSE: ", response);
  const obj = {
    "Time Difference" : await calculateTimeDiff(response, c1alpha3Code, c2alpha3Code)
  };
  res.json(obj);
});

module.exports = router;