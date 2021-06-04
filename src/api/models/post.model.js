const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { omitBy, isNil } = require('lodash');
const APIError = require('@utils/APIError');
const httpStatus = require('http-status');
const ObjectId = Schema.Types.ObjectId

var postSchema = new Schema({
    title: { type: String, require:true},
    description: { type:String, require:true },
    media:{
        type:[{ 
            fieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            destination: String,
            filename: String,
            path: String,
            size: Number,
            compressImageUrl:String 
        }],
        default:[]
    },
    targetDate: { type: Date, default:Date.now},
    scheduleDate: { type: Date, default:Date.now},
    account:{
      id:{
        type:ObjectId,
        ref:'Account',
        required:true
      },
      name:{
        type:String
      },
      type:{
        type:String
      }
    },
    user:{
        type:ObjectId,
        ref:'User',
        required:true
    }
},
  { timestamps: true }
)

postSchema.method({
  transform() {
    const transformed = {};
    const fields = [
        "title",
        "description",
        "media",
        "scheduleDate",
        "targetDate",
        "account",
        "user",
        "createdAt",
        "updatedAt",
        "id"
    ];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

postSchema.statics = {
  /**
   * Get post Type
   *
   * @param {ObjectId} id - The objectId of post Type.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let post;
      if (mongoose.Types.ObjectId.isValid(id)) {
        post = await this.findById(id).exec();
      }
      if (post) {
        return post
      }

      throw new APIError({
        message: "Post does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List post Types in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of post types to be skipped.
   * @param {number} limit - Limit number of post types to be returned.
   * @returns {Promise<Subject[]>}
   */
  async list({ page = 1, perPage = 20, user,title,description,accountName,sort, search }) {
    let options = omitBy({ user,title,description,accountName }, isNil);
     let sortQuery = {createdAt:-1} 
      if(sort=="targetDate"){
         sortQuery = {targetDate:1} 
      }else if(sort=="scheduleDate"){
         sortQuery = {scheduleDate:1} 
      }
      if(search && search.length){
         let queryArr = []
         queryArr.push({ "title": { $regex: search, $options: 'i' } })
         queryArr.push({ "description": { $regex: search, $options: 'i' } })
         queryArr.push({ "account.name": { $regex: search, $options: 'i' } })
         options = { $and: [options, { $or: queryArr }] }
         sortQuery = {targetDate:1} 
       }
      let posts = await this.find(options)
         .sort(sortQuery)
         .skip(perPage * (page * 1 - 1))
         .limit(perPage * 1)
         .exec();
      posts = posts.map((post) => post.transform());
      var count = await this.find(options).exec();
      count = count.length;
      var pages = Math.ceil(count / perPage);

      return { posts, count, pages };
  },
};

module.exports = mongoose.model("Post", postSchema)
