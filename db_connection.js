require("dotenv").config();
const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URL;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Failed to connect to MongoDB: ${err}`);
});
