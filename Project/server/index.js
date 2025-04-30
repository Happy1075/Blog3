import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import cors from 'cors';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware for CORS (allow frontend requests from localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000', // React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

// Middleware for parsing JSON data
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request made to: ${req.url}`);
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// Error Handling Middleware
// Catch 404 errors
app.use((req, res, next) => {
  res.status(404).send('Route Not Found');
});

// Catch all other errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
