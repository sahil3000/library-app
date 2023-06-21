const mongoose = require('mongoose');

const userBookCollectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }
});
const userBookCollectionModal = mongoose.model('UserBookCollection', userBookCollectionSchema);
module.exports = userBookCollectionModal;