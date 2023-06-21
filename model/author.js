const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
const authorModal = mongoose.model('Author', authorSchema);
module.exports = authorModal;