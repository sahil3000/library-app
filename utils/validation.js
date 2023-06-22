const Joi = require('joi');

const signupSchema = Joi.object({ 
    email: Joi.string().required(),
    name: Joi.string().required().min(2), 
    password: Joi.string().required().min(6).max(30) 
});

const loginSchema = Joi.object({ 
    email: Joi.string().required(),
    password: Joi.string().required() 
});

const addBookSchema = Joi.object({
    title: Joi.string().required().min(2),
    authorId: Joi.string().required(),
    genreId: Joi.string().required(),
    isbn: Joi.string().required(),
    qty : Joi.number().required(),
});

const addBookToCollectionSchema = Joi.object({
    userId: Joi.string().required(),
    bookId: Joi.string().required(),
});

const removeBookToCollectionSchema = Joi.object({
    id: Joi.string().required()
});

const addBookReviewSchema = Joi.object({ 
    userId: Joi.string().required(),
    bookId: Joi.string().required(),
    rating: Joi.number().integer().required().min(0).max(5),
});

const validation = ({schema, body}) => {
    console.log("body",body)
    const { error } = schema.validate(body);
    return error;
}

module.exports = { signupSchema, loginSchema, validation, addBookToCollectionSchema, addBookSchema, removeBookToCollectionSchema, addBookReviewSchema };