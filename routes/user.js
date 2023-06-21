const express = require('express');
const userController = require('../controller/user');
const middleWare = require('../utils/middleware');
const { signupSchema, loginSchema } = require('../utils/validation');
const router = express.Router();

router.post(
    '/signup',
    middleWare.inputValidation(signupSchema),
    userController.signup
);

router.post(
    '/login',
    middleWare.inputValidation(loginSchema),
    userController.login
);

module.exports = router;
