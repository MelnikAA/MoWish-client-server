import express from 'express';

import { getPosts, getPostsBySearch, getPostsByTag, getPostsByCreator, getPost, createPost, updatePost, likePost, commentPost, deletePost, LikedPostByUser } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator/:id', getPostsByCreator);
router.get('/tag/:id', getPostsByTag);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/like/:id', LikedPostByUser);
router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);

export default router;