import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import PrivateRoute from './components/PrivateRoute';
import Blog from './pages/Blog';
import MyBlogs from './pages/MyBlogs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><Blogs /></PrivateRoute>}/>
        <Route path="/create" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
        <Route path="/blog/:id" element={<PrivateRoute><Blog /></PrivateRoute>} />
        <Route path="/my-blogs" element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
