import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Career', 'Finance', 'Travel','Sports']
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Blog', blogSchema);
