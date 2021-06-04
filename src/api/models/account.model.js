const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { omitBy, isNil } = require('lodash');
const httpStatus = require('http-status');
const APIError = require('@utils/APIError');

var accountTypeSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, required: true,ref:'User' },
    name:{type:String},
    type:{
        type:String
    }
},
   { timestamps: true }
)

accountTypeSchema.index({ user: 1,type:1 }, { unique: true });

accountTypeSchema.method({
   transform() {
      const transformed = {};
      const fields = ['id','user','type','name','updatedAt','createdAt'];

      fields.forEach((field) => {
         transformed[field] = this[field];
      });

      return transformed;
   },
})

accountTypeSchema.statics = {
   /**
      * Get accountType Type
      *
      * @param {ObjectId} id - The objectId of accountType Type.
      * @returns {Promise<User, APIError>}
      */
   async get(id) {
      try {
         let accountType;
         if (mongoose.Types.ObjectId.isValid(id)) {
            accountType = await this.findById(id).exec();
         }
         if (accountType) {
            return accountType;
         }

         throw new APIError({
            message: 'account does not exist',
            status: httpStatus.NOT_FOUND,
         });
      } catch (error) {
         throw error;
      }
   },

   /**
      * List accountType Types in descending order of 'createdAt' timestamp.
      *
      * @param {number} skip - Number of accountType types to be skipped.
      * @param {number} limit - Limit number of accountType types to be returned.
      * @returns {Promise<Subject[]>}
      */
   async list({ page = 1, perPage = 20,user }) {
      let options = omitBy({ user }, isNil);
      let accountTypes = await this.find(options)
         .sort({ createdAt:-1 })
         .skip(perPage * (page * 1 - 1))
         .limit(perPage * 1)
         .exec();
      accountTypes = accountTypes.map(accountType => accountType.transform())
      var count = await this.find(options).exec();
      count = count.length;
      var pages = Math.ceil(count / perPage);

      return { accountTypes, count, pages }

   },
};


module.exports = mongoose.model('Account', accountTypeSchema);
