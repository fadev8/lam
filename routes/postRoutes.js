const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const controller = require('../controllers/postController');

router.use(bodyparser.urlencoded({extended:false}));

router.route('/').post(controller.addPost).get(controller.getAllPosts);

module.exports = router;