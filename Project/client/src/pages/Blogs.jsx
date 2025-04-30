import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled, Box, Typography, Button } from '@mui/material';

const Container = styled(Box)`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const Filters = styled(Box)`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const StyledSelect = styled('select')`
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const StyledInput = styled('input')`
  padding: 10px;
  font-size: 16px;
  flex-grow: 1;
  border-radius: 6px;
  border: 1px solid #ccc;
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

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/blogs', {
          params: { category, author },
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, [category, author]);

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
      <Filters>
        <StyledSelect value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Career">Career</option>
          <option value="Finance">Finance</option>
          <option value="Travel">Travel</option>
          <option value="Sports">Sports</option>
        </StyledSelect>
        <StyledInput
          type="text"
          placeholder="Search author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Filters>

      <BlogGrid>
        {blogs.map(blog => (
          <BlogCard key={blog._id} onClick={() => navigate(`/blog/${blog._id}`)}>
            <Image src={blog.image || defaultImage} alt={blog.title} />
            <Text>{blog.category}</Text>
            <Heading>{addEllipsis(blog.title, 20)}</Heading>
            <Text>By: {blog.author}</Text>
            <Details>{addEllipsis(blog.content, 100)}</Details>
            {blog.userId === localStorage.getItem('userId') && (
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
            )}
          </BlogCard>
        ))}
      </BlogGrid>
    </Container>
  );
};

export default Blogs;
