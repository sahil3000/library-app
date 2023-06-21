const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
const genreModal = mongoose.model('Genre', genreSchema);
module.exports = genreModal;