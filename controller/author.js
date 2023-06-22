const authorModal = require("../model/author");

const authorController = {
    add: async function (req, res) {
        try {
            const response = await authorModal.create(req.body);
            return res.status(201).json({
                body: response,
                error: false,
                msg: 'author succesfully aded'
            });
        } catch (err) {
            res.status(500).json({
                body: {},
                error: false,
                msg: err.message
            });
        }
    }
}
module.exports = authorController;