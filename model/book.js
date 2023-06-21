const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
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
    }
});
const bookModal = mongoose.model('Book', bookSchema);
module.exports = bookModal;