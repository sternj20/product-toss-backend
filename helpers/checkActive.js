const Contest = require('../models/Contest.js');

function checkActive() {
  //Get current date
  let currentDate = new Date().toISOString();
  let newData = {active: false}
  //Find all contests where the expiration date is greater than the current date and set them to not be active
  Contest.update(,{safe: true, upsert: true},
      function(err, model) {
        console.log(err);
      });
      console.log('Contest is over. Value of active has been changed from true to false')
}
checkActive();

Contest.findOneAndUpdate({expires: {$lte: currentDate}}, {$set:newData}, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return doc
});
//Use moment
//Add a field to the contest model that says created at
//Find contest where created at is >= 7 days ago
//In this function use moment to check and see if created at time is >= a week ago
//If it is, change active status to false 

