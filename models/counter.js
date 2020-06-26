const mongoose = require('mongoose');
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