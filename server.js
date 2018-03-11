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


mongoose.connect(process.env.MONGODB_URI 
  // {promiseLibrary: global.Promise }
);
mongoose.set('debug', true);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}`))

