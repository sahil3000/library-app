const express = require('express');
require('dotenv').config();
const connectDatabase = require('./model/connection');
const { userRoutes, bookRoutes, genreRoutes, authorRoutes } = require('./routes');
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT;

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}));

app.use('/api/auth',userRoutes)
app.use('/api/book',bookRoutes)
app.use('/api/genre',genreRoutes)
app.use('/api/author',authorRoutes )

app.get('', (req, res) => {
    res.send("welcome to app")
});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
module.exports = app;