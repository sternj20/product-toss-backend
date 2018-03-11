const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pt"
  // {promiseLibrary: global.Promise }
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}`))

var schedule = require('node-schedule');
var j = schedule.scheduleJob('48 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});