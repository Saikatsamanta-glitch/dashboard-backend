
const express = require('express');
const router = express.Router();
const batch_model = require('../models/batch'); // Import the Course model
const announcement = require('../models/announcement'); // Import the Announcement model
const user = require('../models/users'); // Import the User Data
// Create User Controller
const createUser = async (req, res) => {
        try {
                const { name, student, email, score, batch } = req.body;
                console.log(req.body);
                const newUser = new user({ name, student, email, score, batch });
                await newUser.save();
                res.status(201).json(newUser);
        } catch (error) {
                res.status(500).json({ error: error });
        }
};

// Read User Controller
const getUsers = async (req, res) => {
        try {
                const users = await user.find();
                res.status(200).json(users);
        } catch (error) {
                res.status(500).json({ error: 'Error retrieving users' });
        }
};

// Update User Controller
const updateUser = async (req, res) => {
        try {
                const { id } = req.params;
                const { name, student, email, batch } = req.body;
                const updatedUser = await user.findByIdAndUpdate(id, { name, student, email }, { new: true });
                res.status(200).json(updatedUser);
        } catch (error) {
                res.status(500).json({ error: 'Error updating user' });
        }
};

// Delete User Controller
const deleteUser = async (req, res) => {
        try {
                const { id } = req.params;
                await user.findByIdAndRemove(id);
                res.status(204).end();
        } catch (error) {
                res.status(500).json({ error: 'Error deleting user' });
        }
};

const loginUser = async (req, res) => {
        const { name, student, email, score, batch } = req.body;
        try {
                let userDetails = await user.findOne({ email: email });
                if (!userDetails) {
                        // If the user doesn't exist, create a new user
                        const newUser = new user({ name, student, email, score, batch });
                        await newUser.save();
                }

                // Find enrolled batches and announcements in parallel
                const [batchEnrolled, announcementList] = await Promise.all([
                        batch_model.find({ _id: { $in: userDetails.batch.map(v => v.toString()) } }),
                        announcement.find({ CourseID: { $in: userDetails.batch.map(v => v.toString()) } }),
                ]);

                const userlog = {
                        announcementList,
                        userDetails,
                        batchEnrolled,
                };

                res.status(200).json({ message: userlog });
        } catch (err) {
                res.status(500).json({ message: "Error is fetching" });
        }
};


// Create a new user
router.post('/users', createUser);

// Retrieve all users
router.get('/users', getUsers);

// Update user information
router.put('/users/:id', updateUser);

// Delete a user
router.delete('/users/:id', deleteUser);

// login a user
router.post('/login', loginUser);

module.exports = router;


/*
{
  "Name": "Saikat Samanta",
  "Student": false,
  "Email": "saikatsamanta052@gmail.com",
  "batch": [
    {
      "$oid": "652b70cce60cba57e8c6d8be"
    },
    {
      "$oid": "652c3b00dfbafb9c1fc11b79"
    }
  ],
  "Score": 3300
}
*/ 