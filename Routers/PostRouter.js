
const express = require("express");

const PostController = require("../Controllers/PostController");

const AuthMiddleware = require("../Middleware/AuthMiddleware");

var app = express();

const router = express.Router();


router.post('/create_post',AuthMiddleware,PostController.createPost);

module.exports = router;