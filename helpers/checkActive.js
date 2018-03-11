const Contest = require('../models/Contest.js');

function checkActive() {
  //Get current date
  let currentDate = new Date()
  let newData = {active: false}
  //Find all contests where the expiration date is greater than the current date and set them to not be active

  Contest.find({expires:{$lte: currentDate}}, function (err, docs) {
    // docs is an array
    console.log(docs)
  });
}

checkActive();

//Use moment
//Add a field to the contest model that says created at
//Find contest where created at is >= 7 days ago
//In this function use moment to check and see if created at time is >= a week ago
//If it is, change active status to false 

