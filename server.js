const express = require('express');

//Initialize server
const app = express();

app.get('/', (req, res) => {
	res.send('Hello world')
})

const port = process.env.PORT || 3000;
//Launch server on port 3000
app.listen(port, () => console.log(`app listening on port ${port}`))