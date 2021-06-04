const express = require('express');
const controller = require('@controllers/account.controller');
const { authorize } = require('@middlewares/auth');

const router = express.Router();

router.param('accountId', controller.load);

router
   .route('/')
   .get(authorize(),controller.list)
   .post(authorize(),controller.create)

router
   .route('/my')
   .get(authorize(),controller.getMyAccount)

router
   .route('/:accountId')
   .get(authorize(),controller.get)
   .patch(authorize(),controller.update)
   .delete(authorize(),controller.remove);

module.exports = router;
