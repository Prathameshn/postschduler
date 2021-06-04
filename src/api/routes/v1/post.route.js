const express = require('express');
const controller = require('@controllers/post.controller');
const { authorize } = require('@middlewares/auth');
const userService = require("@services/user.service")
const accountService = require("@services/account.service")
const multer = require("multer")

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, 'public/Post')
   },
   
   filename: function (req, file,cb) {
       let filename = file.originalname.replace(/\s+/g, '').trim()
       filename = `${new Date().getTime()}_${filename}`
       cb(null, filename)
   }
});

const fileFilter = (req,file,cb) => {
   if(file.mimetype === "image/jpg"  || 
      file.mimetype === "image/jpeg"  || 
      file.mimetype ===  "image/png" ||
      file.mimetype ===  "video/mp4"){
     cb(null, true);
   }else{
     cb(new Error("Image uploaded is not of type jpg/jpeg or png video/mp4"),false);
   }
}

const upload = multer({storage: storage, fileFilter : fileFilter});

const router = express.Router();

router.param('postId', controller.load);

router
   .route('/')
   .get(authorize(),controller.list)
   .post(authorize(),upload.array('file'),userService.setUser,accountService.findOrCreate,controller.setMedia,controller.create)

router
   .route('/my')
   .get(authorize(),controller.getMyPost)

router
   .route('/:postId')
   .get(authorize(), controller.get)
   .patch(authorize(),upload.array('file'),controller.setMedia,accountService.findOrCreate,controller.update)
   .delete(authorize(), controller.remove);


module.exports = router;