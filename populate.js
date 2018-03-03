//SEED DB

const mongoose = require('mongoose');
const Image = require('./models/Image.js');
require('dotenv').config();

const images = [
  {
    url: 'https://i.imgur.com/QLevheC.jpg'
  },
  {
    url: 'https://i.imgur.com/N0HqWH0.jpg'
  },
  {
    url: 'https://i.imgur.com/5wKAT9T.jpg'
  },
  {
    url: 'https://i.imgur.com/zTbh6K1.jpg'
  },
  {
    url: 'https://i.imgur.com/uHQsKx4.jpg'
  },
  {
    url: 'https://i.imgur.com/j1sOGOp.jpg'
  },
  {
    url: 'https://i.imgur.com/gGzVYfg.jpg'
  },
  {
    url: 'https://i.imgur.com/vmawrkj.jpg'
  },
  {
    url: 'https://i.imgur.com/moYE61R.jpg'
  },
  {
    url: 'https://i.imgur.com/WxwlP43.jpg'
  },
  {
    url: 'https://i.imgur.com/cGB1SN8.jpg'
  }
];


mongoose.connect(process.env.MONGODB_URI,
  { promiseLibrary: global.Promise }
);


// Go through each image
images.map(data => {
  // Initialize a model with image data
  let newImg = new Image(data);
  // and save it into the database
  newImg.save();
})

