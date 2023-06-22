const express = require('express');
const middleWare = require('../utils/middleware');
const { addGenreSchema } = require('../utils/validation');
const genreController = require('../controller/genre');
const router = express.Router();

router.post(
    '/add',
    middleWare.verifyToken,
    middleWare.inputValidation(addGenreSchema, false),
    genreController.addGenre
);

module.exports = router;
