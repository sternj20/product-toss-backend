const Contest = require('../models/Contest.js');

function checkActive() {
fetch('http://product-toss-backend.herokuapp.com/api/contest/check-active'{
  method: 'put'
}).then(function(response) {
  console.log(response)
}).catch(function(err) {
  // Error :(
  console.log(error)
});
console.log('Changed')
}

checkActive();

//Use moment
//Add a field to the contest model that says created at
//Find contest where created at is >= 7 days ago
//In this function use moment to check and see if created at time is >= a week ago
//If it is, change active status to false 

