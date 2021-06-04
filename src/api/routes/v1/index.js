const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const accountRoute = require('./account.route')
const postRoute = require('./post.route')

const router = express.Router();

/**
 * GET v1/status
*/
router.get('/status', (req, res) => res.send('OK'));


router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/account', accountRoute);
router.use('/post', postRoute);

module.exports = router;
