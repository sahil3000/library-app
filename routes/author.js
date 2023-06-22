const express = require('express');
const middleWare = require('../utils/middleware');
const { addAuthorSchema } = require('../utils/validation');
const authorController = require('../controller/author');

const router = express.Router();


router.post(
    '/add',
    middleWare.verifyToken,
    middleWare.inputValidation(addAuthorSchema, false),
    authorController.add
);

module.exports = router;
