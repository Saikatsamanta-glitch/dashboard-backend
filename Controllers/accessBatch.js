const Batch = require('../models/batch'); // Import the Batch model
const express = require('express');
const router = express.Router();

// Create a new batch
const createBatch = async (req, res) => {
  try {
    const { name, description, teacherId, image, courses, connect } = req.body;
    const newBatch = new Batch({ name, description, teacherId, image, courses, connect });
    await newBatch.save();
    res.status(201).json(newBatch);
  } catch (error) {
    res.status(500).json({ error: 'Error creating batch' });
  }
};

// Get a list of all batches
const getBatches = async (req, res) => {
  try {
    const batches = await Batch.find().populate('courses'); // Populate courses for more detailed information
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving batches' });
  }
};

// Update batch information
const updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, teacherId, image, courses, connect } = req.body;
    const updatedBatch = await Batch.findByIdAndUpdate(id, { name, description, teacherId, image, courses, connect }, { new: true });
    res.status(200).json(updatedBatch);
  } catch (error) {
    res.status(500).json({ error: 'Error updating batch' });
  }
};

// Delete a batch
const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;
    await Batch.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting batch' });
  }
};



// Create a new batch
router.post('/batches', createBatch);

// Retrieve all batches
router.get('/batches', getBatches);

// Update batch information
router.put('/batches/:id', updateBatch);

// Delete a batch
router.delete('/batches/:id', deleteBatch);

module.exports = router;
