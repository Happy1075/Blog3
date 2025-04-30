import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled, Box, Button, InputBase, TextareaAutosize } from '@mui/material';
import axios from 'axios';

const Container = styled(Box)(({ theme }) => ({
  margin: '50px auto',
  maxWidth: '600px',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
}));

const StyledInput = styled(InputBase)`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const StyledSelect = styled('select')`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  min-height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  margin-bottom: 20px;
  &:focus-visible {
    outline: none;
  }
`;

const EditBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFormData(res.data);
      } catch (err) {
        setError('Blog not found');
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/blogs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update blog');
    }
  };

  return (
    <Container>
      <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        Edit Blog
      </h2>

      {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <StyledInput
          placeholder="Enter Title for your Blog"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <StyledSelect
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Career">Career</option>
          <option value="Finance">Finance</option>
          <option value="Travel">Travel</option>
          <option value="Sports">Sports</option>
        </StyledSelect>

        <StyledInput
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <StyledTextarea
          placeholder="Write your story..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </form>
    </Container>
  );
};

export default EditBlog;
