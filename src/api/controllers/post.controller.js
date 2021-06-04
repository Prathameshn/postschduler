const httpStatus = require('http-status');
const { omit } = require('lodash');
const Post = require("@models/post.model")
const APIError = require('@utils/APIError');


/**
 * Load Post and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
   try {
      const post = await Post.get(id);
      req.locals = { post };
      return next();
   } catch (error) {
      next(new APIError(error));
   }
};

/**
 * Get post
 * @public
 */
exports.get = async(req, res) => {
   let { post } = req.locals
   res.json(post)
};

/**
 * Create new post
 * @public
 */
exports.create = async (req, res, next) => {
   try {
      let { user } = req.locals
      req.body.user = user.id
      const post = new Post(req.body);
      const savedPost = await post.save();
      res.json(savedPost.transform())
   } catch (error) {
      next(new APIError(error));
   }
};

/**
 * Replace existing post
 * @public
 */
exports.replace = async (req, res, next) => {
   try {
      const { post } = req.locals;
      const newPostDetails = new Post(req.body);
      const newPost = omit(newPostDetails.toObject(), '_id');

      await post.updateOne(newPost, { override: true, upsert: true });
      const savedPost = await Post.findById(post._id);

      res.json(savedPost.transform());
   } catch (error) {
      next(new APIError(error));
   }
};

/**
 * Update existing post
 * @public
 */
exports.update = async(req, res, next) => {
   try{
      const updatedPost = omit(req.body);
      const post = Object.assign(req.locals.post, updatedPost);
      const savedPost = await post.save();
      res.json(savedPost.transform())
   }catch(error){
      next(new APIError(error))
   }
};

/**
 * Get post list
 * @public
 */
exports.list = async (req, res, next) => {
   try {
      let posts = await Post.list(req.query);
      return res.json(posts)
   } catch (error) {
      next(new APIError(error));
   }
};


/**
 * Delete post
 * @public
 */
exports.remove = async(req, res, next) => {
    const { post } = req.locals;

    post.remove()
      .then(() => res.status(httpStatus.NO_CONTENT).end())
      .catch(e => next(e));
};

exports.setMedia = async(req, res, next) => {
   try{
      let media;
      let { post } = req.locals
      if(req.files.length > 0){
         media = req.files
         media = await media.map((ele)=>{
           ele.path = `/Post/${ele.filename}`;
           return ele
         })
         if(!post){
            req.body.media = media
         }else{
            req.body.media = post.media.concat(media)
         }
         next()
      }else{
         next()
      }
   }catch(error){
      next(new APIError(error));
   }
};
