const express = require('express');
const PostController = require('../../controllers/PostController');
const { createPostForm } = require('../../utils/validators/post');

const router = express.Router();

router.get('/', [], PostController.getPosts);
router.post('/', [...createPostForm], PostController.createPost);


module.exports = router;
