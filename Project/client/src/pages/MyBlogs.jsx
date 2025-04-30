import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled, Box, Typography, Button } from '@mui/material';

const Container = styled(Box)`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const BlogGrid = styled(Box)`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const BlogCard = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 350px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
`;

const Image = styled('img')`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
  padding: 0 10px;
`;

const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  padding: 5px 10px;
`;

const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
  padding: 0 10px 10px 10px;
  flex-grow: 1;
`;

const ButtonGroup = styled(Box)`
  display: flex;
  gap: 10px;
  padding: 10px;
`;

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/blogs', {
          params: { userId },
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlogs(res.data);
      } catch (err) {
        console.error('Fetch My Blogs failed:', err);
      }
    };
    fetchMyBlogs();
  }, [userId]);

  const defaultImage = '/download.jpeg';

  const addEllipsis = (str, limit) => (str.length > limit ? str.substring(0, limit) + '...' : str);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" mb={3} fontWeight={700}>My Blogs</Typography>
      <BlogGrid>
        {blogs.map(blog => (
          <BlogCard key={blog._id} onClick={() => navigate(`/blog/${blog._id}`)}>
            <Image src={blog.image || defaultImage} alt={blog.title} />
            <Text>{blog.category}</Text>
            <Heading>{addEllipsis(blog.title, 20)}</Heading>
            <Text>By: {blog.author}</Text>
            <Details>{addEllipsis(blog.content, 100)}</Details>
            <ButtonGroup onClick={(e) => e.stopPropagation()}>
              <Link to={`/edit/${blog._id}`} style={{ textDecoration: 'none', flex: 1 }}>
                <Button variant="contained" fullWidth color="primary">Edit</Button>
              </Link>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </BlogCard>
        ))}
      </BlogGrid>
    </Container>
  );
};

export default MyBlogs;
