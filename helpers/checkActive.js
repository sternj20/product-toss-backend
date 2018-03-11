const moment = require('moment');
const Contest = require('../../../models/Contest.js');
var now = moment()

function checkActive() {
  let currentDate = Date.now();
  console.log('Hello');
  Contest.find({created: {$gte: currentDate}, {$set: {active: false}}}, (err, contest) => {
    res.send(contest)
    console.log(Removing these entries.)
  })
}
checkActive();

//Use moment
//Add a field to the contest model that says created at
//Find contest where created at is >= 7 days ago
//In this function use moment to check and see if created at time is >= a week ago
//If it is, change active status to false 

