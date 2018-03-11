const Contest = require('../models/Contest.js');
const fetch = require('node-fetch');
function checkActive() {
fetch('http://product-toss-backend.herokuapp.com/api/contest/check-active', { method: 'PUT' })
  .catch(err => console.error(err))
  .then(res => res.send('Success'))
}

checkActive();

//Use moment
//Add a field to the contest model that says created at
//Find contest where created at is >= 7 days ago
//In this function use moment to check and see if created at time is >= a week ago
//If it is, change active status to false 

