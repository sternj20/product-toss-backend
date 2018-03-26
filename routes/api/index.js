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
router.put('/imgs/:uid/', (req, res) => {
    // Delete img from imgs array in user model
    User.find({_id: req.params.uid}, function(err, user){
        if(err) console.log(err)
            user[0].images.remove(req.body.imgId)
        user[0].save()

        //Delete img from all contests
        Contest.find({}, function(err, contest){
            contest.forEach(element => {
                element.submissions.remove(req.body.imgId)
                element.save()        
            })
            if(err) console.log(err)
        })
        //Delete img from AWS S3
        let params = {
          Bucket: process.env.AWS_BUCKET,
          Key: req.body.fileName
          /* where value for 'Key' equals 'pathName1/pathName2/.../pathNameN/fileName.ext' - full path name to your file without '/' at the beginning */
      };
      s3.deleteObject(params, function(err, data) {
          if (err){
            console.log(err, err.stack);
        } 
        else{
            res.send(data)
            //Delete img from Mongo
            Image.find({_id:req.body.imgId}).remove().exec();
        }
    });
  });
    console.log('image deleted')
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
        //Find images you have not voted on 
        Image.find({ _id : { $nin: result.votedImages}}, (err, img) => {
            //Get active contest
            Contest.findOne({active:true}).populate("submissions")
            .exec((err, contest) => {
                //Get archived contests, sorted by date created and submissions sorted by most votes
                Contest.find({active: false}).sort('-createdAt')
                .populate({path: 'submissions', options: { sort: { 'votes': -1 }}})
                .exec(function(err, docs) {
                    let archivedContests = docs.sort('votes')
                    data.archivedContests = archivedContests
                    data.activeContest = contest
                    data.uploads = result.images
                    res.send(data)            
                })
            })
        })
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
});

//Route to follow a user
//Second user is added to following array in User model fist array
//First user is added to followers array in User model for second user
router.post ('/user/:uid/:uid2', (req, res) => {
    User.update({ _id: req.params.uid}, {$push: {following: req.params.uid2}},{safe: true, upsert: true}, function(err, model) {
        console.log(err);
        User.update({ _id: req.params.uid2}, {$push: {followers: req.params.uid}}, {safe: true, upsert: true}, function(err, model) {
            res.send('Follower added')
        })
    });
})
//Admin route -- shows all data
router.get('/admin', (req, res) => {
    // Contest.findOne({active:true}).populate({path: 'submissions', options: { sort: { 'votes' : -1}}}).exec((err, contest) => {
    //     res.send(contest)
    // })
    User.findOne({_id: 'sXRfS6EcfDc3xvH5c8zQF3Xttio2'}).populate('followers').populate('images').exec((error, result) => {
        res.send(result)
    });
})

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

