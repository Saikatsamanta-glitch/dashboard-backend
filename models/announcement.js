const mongoose = require('mongoose');

// Define the Announcement schema
const announcementSchema = new mongoose.Schema({
        courseID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref:'batch_schema'
        },
        title: {
                type: String,
                required: true,
        },
        content: {
                type: String,
                required: true,
        },
        dateTime: {
                type: Date,
                default: Date.now,
        },
});

// Create a model for the Announcement schema
const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
