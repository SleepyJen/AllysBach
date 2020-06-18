const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.Votes.find({}).then(result => {
        res.json(result);
    });
});

router.get('/getName', (req, res) => {
    db.Votes.find({ name: req.body.name }).then(result => {
        res.json(result);
    });
});

router.post('/name', (req, res) => {
    db.Votes.create({
        name: req.body.name
    }).then(result => {
        res.json(result);
    });
});

router.post('/choices', (req, res) => {
    db.Votes.findOneAndUpdate({ name: req.body.name },
        {
            $push: {
                votes: req.body.votes
            }
        }
    ).then(result => {
        res.json(result);
    });
});

module.exports = router;