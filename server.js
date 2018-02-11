const express = require('express');

//Initialize server
const app = express();

app.get('/', (req, res) => {
	res.send('Hello world')
})

const port = process.env.PORT || 3000;
//Launch server on port 3000
app.listen(3000, () => console.log('Example app listening on port 3000!'))