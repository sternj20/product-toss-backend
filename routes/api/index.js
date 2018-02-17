const router = require('express').Router();
const Image = require('../../models/Image.js');
//Gets all images
router.get('/imgs', (req, res) => {
	let imgs;
	Image.find({voted:false}, (err, img) => {
		res.send(img)
	})
})

//Update # of votes in db
router.put('/imgs/:id/:value/', (req, res) => {
	let query = {'_id': req.params.id}
	Image.findOneAndUpdate(query, newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
	  let newData = {posVotes: doc.posVotes++, voted: true}
		res.send('successfully updated')
	});
})

module.exports = router;