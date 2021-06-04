const APIError = require('@utils/APIError');
const User = require("@models/auth/user.model")

exports.setUser = async (req, res, next) => {
   try {
      const { entity } = req.session
      const user = await User.get(entity)
      if(req.locals)
         req.locals.user = user.transform()
      else{
         req.locals = {
            user:user.transform()
         }
      }
      return next()
   } catch (error) {
      next(error)
   }
}