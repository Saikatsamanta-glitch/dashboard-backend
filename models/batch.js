const mongoose = require('mongoose');
const batch_schema = new mongoose.Schema({
        Name: { type: String, required: true, unique: true },
        Description: { type: String, required: false },
        TeacherId: { type: String, required: true, unique: true },
        Image: { type: String, required: true },
        course: [{ type: String }],
        connect:{type:Object}
})
module.exports = new mongoose.model('batches', batch_schema);