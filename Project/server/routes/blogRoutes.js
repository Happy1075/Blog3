import express from 'express';
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById
} from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .get(protect, getBlogById)   // 👈 yeh line add karni thi
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;
