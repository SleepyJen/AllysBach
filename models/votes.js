const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VotesSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    choices: {
        type: [],
        default: []
    },

    suggestions: {
        type: [],
        default: []
    }
});

const Votes = mongoose.model('Votes', VotesSchema);

module.exports = Votes;