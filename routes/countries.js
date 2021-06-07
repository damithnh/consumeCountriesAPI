const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const oboe = require('oboe');


function getByValue(map, searchValue) {
    let list = []
    for (let [key, value] of map.entries()) {
        if (value === searchValue)
        list.push(key)
    }
    return list;
}

router.get('/', async (req, res) => {
    // const apiURL = `https://restcountries.eu/rest/v2/all`;
    // console.log("apitesting");
    // const options = {
    //     "method": "GET"
    // };
    // const response = await fetch (apiURL, options)
    //                     .then(res => res.json())
    //                     .catch(e => {
    //                         console.error({
    //                             error: e
    //                         });
    //                     });
    // console.log("RESPONSE: ", response);
    let map = new Map(); 
    oboe('https://restcountries.eu/rest/v2/all')
      .node('currencies.*', function( currency ){
        if (map.has(currency.name)){
          map.set(currency.name, 2);
        }
        else{
            map.set(currency.name, 1); 
        }
    })   
    .done(function(things){
      res.send(getByValue(map, 2));
   });
});

// router.get('/gettimediff/', (req, res) => {

//   let c1alpha3Code = "BDI.alpha3Code";
//   let c2alpha3Code = "LAO";
//   oboe('https://restcountries.eu/rest/v2/all')
//     .node(c1alpha3Code+'.alpha3Code', function( c1alpha3Code ){
//       console.log(c1alpha3Code);
//     })
//     .node(c2alpha3Code+'alpha3Code', function(c2alpha3Code ){
//       console.log(c2alpha3Code);
//   })    
//     .done(function(things){
//       // res.send(getByValue(map, 2));
//       res.send(404);
//    });
// });

module.exports = router;