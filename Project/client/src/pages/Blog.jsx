import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://blog3-rs2o.onrender.com/blogs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBlog(res.data);
      } catch (err) {
        setError('Blog not found');
      }
    };
    fetchBlog();
  }, [id]);

  if (error) return <Typography color="error" textAlign="center" mt={4}>{error}</Typography>;
  if (!blog) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;

  return (
    <Box sx={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        By <b>{blog.author}</b> | Category: <b>{blog.category}</b>
      </Typography>
      {blog.image && (
        <Box
          component="img"
          src={blog.image}
          alt="Blog"
          sx={{ width: '100%', borderRadius: '8px', marginY: '20px' }}
        />
      )}
      <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
        {blog.content}
      </Typography>
    </Box>
  );
};

export default Blog;
