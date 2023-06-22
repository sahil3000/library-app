const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    authorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },
    isbn: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const bookModal = mongoose.model('Book', bookSchema);
module.exports = bookModal;