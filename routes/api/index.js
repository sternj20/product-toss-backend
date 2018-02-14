const router = require('express').Router();
const Image = require('../../models/Image.js');
//Gets all images
router.get('/imgs', (req, res) => {
	let imgs;
	Image.find({}, (err, img) => {
		res.send(img)
	})
})

//Update an image in DB, positive or negative votes
router.put('/imgs/:id/:value/:operation', (req, res) => {
	console.log(req.params.id)
	console.log(req.params.value)
	let query = {'_id': req.params.id}
	let newData;
	if(req.params.operation === 'positive') {
		newData = {posVotes: parseInt(req.params.value) + 1};
	} else {
		newData = {negVotes: parseInt(req.params.value) - 1};
	}
	Image.findOneAndUpdate(query, newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});
})

module.exports = router;