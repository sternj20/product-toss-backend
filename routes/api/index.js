const router = require('express').Router();
const Image = require('../../models/Image.js');
//Gets all images
router.get('/imgs', (req, res) => {
	let imgs;
	Image.find({voted:false}, (err, img) => {
		res.send(img)
	})
})

router.post('/imgs', (req, res) => {
	res.send(req.body)
	console.log(req.body)
})

//Update # of votes in
router.put('/imgs/:id/:value/', (req, res) => {
	let query = {'_id': req.params.id}
	let newData = {votes: parseInt(req.params.value) + 1, voted: true}
	Image.findOneAndUpdate(query, newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
		res.send('successfully updated')
	});
})


module.exports = router;