const Contest = require('../models/Contest.js');
const fetch = require('node-fetch');
function checkActive() {
fetch('http://product-toss-backend.herokuapp.com/api/contest/check-active', { method: 'PUT' })
  .then(function(res) {
    return console.log('Success')
  }).catch(function(err) {
    // Error :(
    return console.log(err)
  });
}

checkActive();
