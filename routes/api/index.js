const router = require('express').Router();
const Image = require('../../models/Image.js');
const User = require('../../models/User.js');
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')


const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

// Initialize multers3 with our s3 config and other options
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key(req, file, cb) {
      let type = file.mimetype.split('/')[1]
      cb(null, Date.now().toString() + "." + type);
    }
  })
})

	
//Gets all images
router.get('/imgs', (req, res) => {
	let imgs;
	Image.find({voted:false}, (err, img) => {
		res.send(img)
	})
})

router.post('/imgs', upload.single('photo'), (req, res, next) => {
  res.json(req.file)
  let img = new Image({url: req.file.location})
  img.save();
})

router.post('/user/new/', (req, res) => {
  let user = new User({
    _id: req.body.uid,
    email: req.body.email
  })
  user.save()
  res.json(req.body)
})

//Update # of votes in
router.put('/imgs/:uid/:id/:value/', (req, res) => {
  User.findOneAndUpdate({ _id : req.params.uid }, {$push: {votedImages: req.params.id}}
	// let query = {'_id': req.params.id}
	// let newData = {votes: parseInt(req.params.value) + 1, voted: true}
	// Image.findOneAndUpdate(query, newData, {upsert:true}, function(err, doc){
 //    if (err) return res.send(500, { error: err });
	// 	res.send('successfully updated')
	// });
})


module.exports = router;

