const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VotesSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    dates: {
        type: [],
        default: []
    },

    locations: {
        type: [],
        default: []
    },

    suggestions: {
        type: [],
        default: []
    },

    tshirt: {
        type: String,
        required: true
    }
});

const Votes = mongoose.model('Votes', VotesSchema);

module.exports = Votes;