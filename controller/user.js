const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    signup: async function (req, res) {
        const {name, email, password} = req.body;

        try {
            const isEmailExist = await User.findOne({email});

            if (isEmailExist) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'email already exists'
                }); 
            }

            const payload  = {
                email,
                name,
            }
            const salt = bcrypt.genSaltSync(10);
            const hasgPassword = bcrypt.hashSync(password, salt);
            payload.password = hasgPassword
            const result = await User.create(payload);

            const token = jwt.sign({
                id: result._id
            }, process.env.TOKEN_SECRET);

            const response = {
                id: result._id,
                name: result.name,
                email: result.email,
                token
            }
            res.json({
                error: false,
                msg: 'user successfully signup',
                body: response
            })

        } catch (err) {
            res.json({
                error: true,
                body: {},
                msg: 'user signup failed'
            })
        }
    },
    login: async function (req, res) {
        const {email, password} = req.body;

        try {
            const isEmailExist = await User.findOne({email});
            if (!isEmailExist) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'email or password is wrong'
                });
            }

            
            
            const isPasswordTrue = bcrypt.compareSync(password, isEmailExist.password);
                if (!isPasswordTrue) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'email or password is wrong'
                });
            }
            
            const token = jwt.sign({
                id: isEmailExist._id
            }, process.env.TOKEN_SECRET);

            const response = {
                id: isEmailExist._id,
                name: isEmailExist.name,
                email: isEmailExist.email,
                token
            }
            res.json({
                error: false,
                msg: 'user successfully login',
                body: response
            })

        } catch (err) {
            res.json({
                error: true,
                body: {},
                msg: 'user login failed'
            })
        }
    }
}

module.exports = userController;
