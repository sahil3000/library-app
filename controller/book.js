const authorModal = require("../model/author");
const bookModal = require("../model/book");
const genreModal = require("../model/genre");
const reviewModal = require("../model/review");
const userBookCollectionModal = require("../model/userBookCollection");

const Book = bookModal;
const Author = authorModal;
const Genre = genreModal;
const UserBookCollection = userBookCollectionModal;
const Review = reviewModal;

const bookController = {
    addBook: async function (req, res) {
        const {authorId, genreId } = req.body;
        
        try {
            // check author id and genre id is valid or not. If not valid, it throws error on catch block
            await Author.findOne({_id: authorId});
            await Genre.findOne({_id: genreId});
            

            // insert book detail
            const result = await Book.create(req.body)
            return res.status(201).json({
                error: false,
                body: result,
                msg: "book inserted successfully"
            });
        } catch (err) {
            return res.status(500).json({
                error: true,
                body: {},
                msg: err.message
            });
        }
    },

    getAllBooks: async function(req, res) {
        const query = req.query;
        console.log("queryquery",query)

        let execQuery = [
            {
                $lookup: {
                    from: "authors",
                    localField: 'authorId',
                    foreignField: '_id',
                    as: 'authorDetails'
                }
            },
            {
                $lookup: {
                    from: "genres",
                    localField: 'genreId',
                    foreignField: '_id',
                    as: 'genreDetails'
                },
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: '_id',
                    foreignField: 'bookId',
                    as: 'bookReview'
                },
            }
        ]

        // search filter
        if (query.field === 'title') {
            execQuery = [ ...execQuery, {
                $match: {
                    [query.field]: {
                            '$regex': `^${query.search}`
                    }
                }
            }]
        } else if (query.field === 'genre') {
            execQuery = [ ...execQuery, {
                $match: {
                    "genreDetails.name": {
                            '$regex': `^${query.search}`
                    }
                }
            }]
        } else if (query.field === 'author') {
            execQuery = [ ...execQuery, {
                $match: {
                    "authorDetails.name": {
                            '$regex': `^${query.search}`
                    }
                }
            }]
        }

        try {
            const books = await Book.aggregate(execQuery);

            return res.status(200).json({
                error: false,
                body: books,
                msg: 'all books data'
            });
        } catch (err) {
            return res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    addBookToUserCollection: async function (req, res) {
        try {
            const {bookId} = req.body;
            // check book id is valid or not
            await Book.findOne({_id: bookId});


            const response = await UserBookCollection.create({
                bookId,
                userId: req.userId
            })

            return res.status(201).json({
                error: true,
                body: response,
                msg: 'book successfully added to user collection'
            });
        } catch (err) {
            return res.status(500).json({
                error: true,
                body: {},
                msg: err.message
            });
        }
    },

    removeBookToUserCollection: async function (req, res) {
        try {
            const {id} = req.params;
            
            const deleteRecord = await UserBookCollection.findOneAndDelete({_id: id});

            if (deleteRecord) {
                return res.json({
                    error: false,
                    msg: 'book successfully remove from user collection',
                    body: {}
                });
            } 
            return res.json({
                error: false,
                msg: 'invalid id. Fail to remove from user collection',
                body: {}
            });
            
        } catch (err) {
            return res.status(500).json({
                error: true,
                body: {},
                msg: err.message
            });
        }
    },

    addBookReview: async function (req, res) {
        try {
            let body = req.body;
            
            if (req.userId) {
                body = { ...body, userId: req.userId };
            }

            const response = await Review.create(body)
            return res.status(201).json({
                error: false,
                body: response,
                msg: 'book review successfully added'
            });
        } catch (err) {
            return res.status(500).json({
                error: true,
                body: {},
                msg: err.message
            });
        }
    },
}
module.exports = bookController;