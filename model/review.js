const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    rating: {
        type: Number,
        required: true
    },
});
const reviewModal = mongoose.model('Review', reviewSchema);
module.exports = reviewModal;