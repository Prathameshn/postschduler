const APIError = require('@utils/APIError');
const Account = require("@models/account.model")

exports.findOrCreate = async (req, res, next) => {
   try {
      const { entity } = req.session
      const { accountType } = req.body
      if(accountType){
          let query = {user:entity,type:accountType}
          const account = await Account.findOne(query)
          if(account){
              req.body.account = account.transform()
              return next()
            }
          else{
            let account = new Account(query)
            let _account = await account.save()
            req.body.account = _account.transform()
            return next()
          }
      }else{
        return next()
      }
   } catch (error) {
      next(error)
   }
}