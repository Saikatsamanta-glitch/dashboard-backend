const Scheduling = require('../models/schedule'); // Import the Scheduling model
const express = require('express');
const router = express.Router();
// Create a new scheduling event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDateTime,
      endDateTime,
      createdBy,
      batch,
      classlink,
      active,
      recordedLink,
    } = req.body;

    const newEvent = new Scheduling({
      title,
      description,
      startDateTime,
      endDateTime,
      createdBy,
      batch,
      classlink,
      active,
      recordedLink,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error creating scheduling event' });
  }
};

// Get a list of all scheduling events
const getEvents = async (req, res) => {
  try {
    const events = await Scheduling.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving scheduling events' });
  }
};

// Update scheduling event information
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      startDateTime,
      endDateTime,
      batch,
      classlink,
      active,
      recordedLink,
    } = req.body;

    const updatedEvent = await Scheduling.findByIdAndUpdate(
      id,
      {
        title,
        description,
        startDateTime,
        endDateTime,
        batch,
        classlink,
        active,
        recordedLink,
      },
      { new: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error updating scheduling event' });
  }
};

// Delete a scheduling event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Scheduling.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting scheduling event' });
  }
};

// Create a new user
router.post('/create', createEvent);
// Retrieve all users
router.get('/', getEvents);
// Update user information
router.put('update/:id', updateEvent);
// Delete a user
router.delete('/delete/:id', deleteEvent);

module.exports = router;

