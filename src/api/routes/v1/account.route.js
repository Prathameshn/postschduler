const express = require('express');
const controller = require('@controllers/account.controller');

const router = express.Router();

router.param('cityId', controller.load);

router
   .route('/')
   .get(controller.list)
   .post(controller.create)

router
   .route('/:cityId')
   .get(controller.get)
   .patch(controller.update)
   .delete(controller.remove);

module.exports = router;
