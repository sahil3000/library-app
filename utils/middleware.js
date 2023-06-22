const jwt = require('jsonwebtoken');
const { validation } = require('./validation');
const validationErrorMessage = require('./validationError');

const middleWare = {
    verifyToken: async function (req, res, next) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'please provide token'
                });
            }
            const isValid = jwt.verify(token, process.env.TOKEN_SECRET);

            if (!isValid) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'invalid token'
                });
            }

            req.userId = isValid.id
            next();
        } catch (err) {
            return res.json({
                error: true,
                body: {},
                msg: 'invalid token'
            });
        }
    },

    inputValidation: (schema, isUserIdRequired = false, fromParams = false) => {
        return async (req, res, next) => {
            let body = req.body;
            if (fromParams) {
                body = {...body, ...req.params};
            }
            if (isUserIdRequired) {
                body = { ...body, userId: req.userId };
            }
            const error = validation({ 
                schema,
                body
            });

            if (error) {
                validationErrorMessage(error, res)
                return;
            }
            next();
        }
    }
}
module.exports = middleWare;