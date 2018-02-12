const router = require('express').Router();
const Image = require('../../models/Image.js');
router.get('/imgs', (req, res) => {
	let imgs;
	Image.find({}, (err, img) => {
		res.send(img)
	})
})

module.exports = router;