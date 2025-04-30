import Blog from '../models/Blog.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all blogs
// @route   GET /blogs
export const getBlogs = asyncHandler(async (req, res) => {
  const { category, author, userId } = req.query;
  const filter = {};
  
  if (category) filter.category = category;
  if (author) filter.author = author;
  if (userId) filter.userId = userId;

  const blogs = await Blog.find(filter).sort('-createdAt');
  res.json(blogs);
});

// @desc    Create blog
// @route   POST /blogs
export const createBlog = asyncHandler(async (req, res) => {
  const { title, category, content, image } = req.body;
  
  const blog = await Blog.create({
    title,
    category,
    author: req.user.name,
    content,
    image: image || '',
    userId: req.user._id
  });

  res.status(201).json(blog);
});

// @desc    Update blog
// @route   PUT /blogs/:id
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  if (blog.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this blog');
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true }
  );

  res.json(updatedBlog);
});

// @desc    Delete blog
// @route   DELETE /blogs/:id
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  if (blog.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this blog');
  }

  await blog.deleteOne();
  res.json({ message: 'Blog removed' });
});


// @desc    Get single blog
// @route   GET /blogs/:id
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  res.json(blog);
});
