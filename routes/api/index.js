const mongoose = require('mongoose');

const router = require('express').Router();
const Image = require('../../models/Image.js');
const User = require('../../models/User.js');
const Contest = require('../../models/Contest.js');
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

require('dotenv').config();


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


//Upload an image
router.post('/imgs/:uid', upload.single('photo'), (req, res, next) => {
  let img = new Image({url: req.file.location})
  img.save(function(err,img) {
    if(err) return err
      let imgId = img._id
    User.update(
      {_id: req.params.uid},
      {
        $push: {images:imgId},
      },
      {safe: true, upsert: true},
      function(err, model) {
        console.log(err);
      }
      );
    res.json(req.file)
  });
})


//Delete an image
router.put('/imgs/:fileName/:imgId', (req, res) => {
    let params = {
      Bucket: process.env.AWS_BUCKET,
      Key: req.params.fileName
    /* where value for 'Key' equals 'pathName1/pathName2/.../pathNameN/fileName.ext' - full path name to your file without '/' at the beginning */
    };
    s3.deleteObject(params, function(err, data) {
      if (err){
        console.log(err, err.stack);
      } 
      else{
        res.send(data)
        Image.find({_id:req.params.imgId}).remove().exec();
      }    
    });
})

//After user is authenticated with firebase, they are added to our DB
router.post('/user/new/', (req, res) => {
  let user = new User({
    _id: req.body.uid,
    email: req.body.email
  })
  user.save()
  res.json(req.body)
})




//Showing user data
router.get('/user/:uid', (req, res) => {
  data = {}
  submissions = []
  User.findOne({ _id : req.params.uid}).populate("votedImages").populate("images").exec((error, result) => {
    Image.find({ _id : { $nin: result.votedImages}}, (err, img) => {
        Contest.find({active:true}).populate("submissions").exec((err, contest) => {
            data.contests = contest
            data.images = img
            data.uploads = result.images
            res.send(data)            
        })
    })
  })
});

//Voting on an image
router.put('/imgs/:uid/:id/:val', (req, res) => {
  let query = {'_id': req.params.id}
  let newData = {votes: parseInt(req.params.val) + 1}
  Image.update(query, {$set: newData},{safe: true, upsert: true},
    function(err, model) {
      console.log(err);
    });
  User.update(
    {_id: req.params.uid},
    {
      $push: {votedImages:req.params.id},
    },
    {safe: true, upsert: true},
    function(err, model) {
      console.log(err);
    }
    );
  res.send('')
})

//Adding a new contest
router.post("/contest/new/", (req, res) => {
 let contest = new Contest({name:req.body.name})
  console.log(req.body)
  contest.save();
  res.send('')
})

//Submitting an image to a contest
router.post("/contest/:cid/", (req, res) => {
    let id = req.body._id
    Contest.update({_id: req.params.cid},  {$push: {submissions: id}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    });
    res.send('Contest added')
})

//Changes active status of contest from true to false if the expired date is older than current date 
router.put('/contest/check-active', (req, res) => {
  let currentDate = new Date()
  let newData = {active: false}
  Contest.update({expires: {$lte: currentDate}}, {$set:newData}, {multi:true, upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return doc
  });
  res.send('Active status updated')
})
module.exports = router;

//Showing a single image based on ID
router.get('/imgs/:id', (req, res) => {
    Image.find({_id: req.params.id}, (err, img) =>{
        res.send(img)
    })
})
