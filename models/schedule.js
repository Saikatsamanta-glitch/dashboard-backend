const mongoose = require('mongoose');

// Define the Scheduling schema
const schedulingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema for the creator of the event
    required: true,
  },
  batch:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
  },
  classlink:{
        type: String,
  },
  active:{
        type: Boolean,
        required: true
  },
  recordedLink:{
        type: String,
  }
});

// Create a model for the Scheduling schema
const Scheduling = mongoose.model('Scheduling', schedulingSchema);
module.exports = Scheduling;
