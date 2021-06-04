const Account = require("@models/account.model")
const APIError = require('@utils/APIError');
const httpStatus = require('http-status');
const { omit } = require('lodash');


/**
 * Load Account and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
    try {
        const account = await Account.get(id);
        req.locals = { account };
        return next();
    } catch (error) {
        return next(new APIError(error));
    }
 };

 /**
 * Get account obj
 * @public
 */
exports.get = (req, res) => res.json(req.locals.account);


/**
 * Update existing account
 * @public
 */
exports.update = (req, res, next) => {
    const updatedAccount = omit(req.body);
    const account_ = Object.assign(req.locals.account, updatedAccount);

    account_.save()
       .then(savedAccount => res.json(savedAccount))
       .catch(e => next(new APIError(e)));
 };

/**
 * Create new account obj
 * @public
 */
exports.create = async (req, res, next) => {
    try {
        let { entity } =req.session
        req.body.user = entity
        const account = new Account(req.body);
        const savedaccount = await account.save();
        res.status(httpStatus.CREATED);
        return res.json(savedaccount.transform());
    } catch (error) {
        return next(new APIError(error));
    }
 };



/**
 * remove new account obj
 * @public
 */
exports.remove = async (req, res, next) => {
    //permanant delete procust
    const { account } = req.locals;

    account.remove()
      .then(() => res.status(httpStatus.NO_CONTENT).end())
      .catch(e => next(new APIError(error)));

    //vertual deleted account
    // const updatedAccount = omit({isDeleted:true});
    // const account_ = Object.assign(req.locals.account, updatedAccount);

    // account_.save()
    //    .then(savedAccount => res.json(savedAccount))
    //    .catch(e => next(new APIError(e)));
};

  /**
 * Get feed list
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        let { isDeleted } = req.query
        req.query.isDeleted = isDeleted ? isDeleted: false
        let accounts = await Account.list(req.query);
        return res.json(accounts)
    } catch (error) { 
       next(new APIError(error));
    }
 };

 exports.getMyAccount = async (req, res, next) => {
    try {
        let { entity } = req.session
        req.query.user = entity
        let accounts = await Account.list(req.query);
        return res.json(accounts)
    } catch (error) { 
       next(new APIError(error));
    }
 };
 
 exports.getMoviesInAccount = async (req, res, next) => {
    try {
        let { movies } = req.locals
        return res.json(movies)
    } catch (error) { 
       next(new APIError(error));
    }
 };
 