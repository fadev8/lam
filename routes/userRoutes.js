const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')
const bodyparser = require('body-parser');
//routes for user
//router.use(bodyparser.urlencoded({extended:false}));
router.route('/').get(controller.getUser).post(controller.getUser);

module.exports = router;