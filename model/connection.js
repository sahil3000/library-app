const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongodb connected")
    } catch (err) {
        console.log("errr", err.message);
    }
}
module.exports = connectDatabase;
require('./author');
require('./genre');