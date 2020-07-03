const mongoose = require('mongoose');
const { model, count } = require('./votes');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    voterId: {
        type: Number,
        required: true
    },

    suggestion: {
        type: String,
        required: true
    },

    counter: {
        type: Number,
        required: true
    }
});

const Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;