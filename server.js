const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
// const routes = require('./routes');
//Initialize server
const app = express();

const data = {items: [
                {
                    id: 1,
                    label: 'List item 1'
                },
                {
                    id: 2,
                    label: 'List item 2'
                },
                {
                    id: 3,
                    label: 'List item 3'
                },
                {
                    id: 4,
                    label: 'List item 4'
                }
            ]}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(routes)
app.get('/items', (req, res) => {
	res.send(data.items)
})


mongoose.connect(process.env.MONGODB_URI,
  {promiseLibrary: global.Promise }
);

const port = process.env.PORT || 3000;
//Launch server on port 3000
app.listen(port, () => console.log(`app listening on port ${port}`))