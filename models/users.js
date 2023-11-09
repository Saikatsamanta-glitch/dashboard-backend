const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  student: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  batch: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'batch_schema', // Reference to the Course schema
  }],
  score: {
    type: Number,
    default: 0,
  },
});

// Create a model for the User schema
const User = mongoose.model('User', userSchema);
module.exports = User;
