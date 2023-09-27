const express = require('express');
const router = express.Router();
const blogController = require('../Controllers/blogController');

router.get('/',blogController.blogIndex);
//post request
router.post('/',blogController.blog_create_post);
router.get('/create',blogController.blog_create_get);
router.get('/:id',blogController.blogDetails);
router.delete('/:id',blogController.blog_delete);
module.exports = router;


