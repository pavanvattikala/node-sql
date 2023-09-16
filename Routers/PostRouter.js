
const express = require("express");

const PostController = require("../Controllers/PostController");

const AuthMiddleware = require("../Middleware/AuthMiddleware");

var app = express();

const router = express.Router();


router.post('/create_post',AuthMiddleware,PostController.createPost);

router.post('/get_posts',AuthMiddleware,PostController.getPosts);


router.get('/get_post/:id',PostController.getPostById);

module.exports = router;