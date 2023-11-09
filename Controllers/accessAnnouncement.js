const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');
const createAnnouncement = async (req, res) => {
  try {
    const { courseID, title, content } = req.body;
    const newAnnouncement = new Announcement({ courseID, title, content });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: 'Error creating announcement' });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving announcements' });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, { title, content }, { new: true });
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ error: 'Error updating announcement' });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await Announcement.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting announcement' });
  }
};

// Create announcement
router.post('/create',createAnnouncement)
// Get all announments
router.get('/read',getAnnouncements)
// Update announment
router.put('/update/:id',updateAnnouncement)
// Delete announment
router.delete('/delete/:id',deleteAnnouncement)
module.exports = router