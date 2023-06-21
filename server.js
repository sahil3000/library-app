const express = require('express');
require('dotenv').config();
const connectDatabase = require('./model/connection');
const { userRoutes, bookRoutes } = require('./routes');
const app = express();
const port = process.env.PORT;

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',userRoutes)
app.use('/api/book',bookRoutes)

app.get('', (req, res) => {
    res.send("welcome to app")
});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});