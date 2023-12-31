const express = require('express');
const bookController = require('../controller/book');
const middleWare = require('../utils/middleware');
const { addBookToCollectionSchema, addBookSchema, removeBookToCollectionSchema, addBookReviewSchema } = require('../utils/validation');
const router = express.Router();

router.post(
    '/add',
    middleWare.verifyToken,
    middleWare.inputValidation(addBookSchema),
    bookController.addBook
);

router.get(
    '/',
    middleWare.verifyToken,
    bookController.getAllBooks
);

router.post(
    '/addBookToCollection',
    middleWare.verifyToken,
    middleWare.inputValidation(addBookToCollectionSchema, true),
    bookController.addBookToUserCollection
);

router.post(
    '/addBookReview',
    middleWare.verifyToken,
    middleWare.inputValidation(addBookReviewSchema, true),
    bookController.addBookReview
);

router.delete(
    '/removeBookToCollection/:id',
    middleWare.verifyToken,
    middleWare.inputValidation(removeBookToCollectionSchema, false, true),
    bookController.removeBookToUserCollection
);

module.exports = router;
