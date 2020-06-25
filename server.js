const express = require('express');
const app = express();
const PORT = 8000 || process.env.PORT;
const path = require('path');

const mongoose = require('mongoose');
const connection = mongoose.connection;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/AllysBach';

const Color = require('colors');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

connection.on('error', () => {
    console.log('connection error!');
});

connection.once('open', () => {
    console.log('connected to database');
    console.log('----------------------------'.rainbow);
});

app.use(express.static('./views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const votes = require('./controller/votesAPI');
app.use('/votes', votes);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

app.listen(PORT, () => {
    console.log('\n-------------------------'.rainbow);
    console.log(`Listening on http://localhost:${PORT}`.blue);
});