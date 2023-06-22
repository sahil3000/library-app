const genreModal = require("../model/genre");

const genreController = {
    addGenre: async function (req, res) {
        try {
            const response = await genreModal.create(req.body);
            return res.status(201).json({
                body: response,
                error: false,
                msg: 'genre succesfully aded'
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
module.exports = genreController;