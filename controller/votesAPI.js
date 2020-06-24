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

router.post('/dates', (req, res) => {
    db.Votes.findOneAndUpdate({ name: req.body.name },
        {
            $push: {
                dates: req.body.dates
            }
        }
    ).then(result => {
        res.json(result);
    });
});

router.post('/locations', (req, res) => {
    db.Votes.findOneAndUpdate({ name: req.body.name },
        {
            $push: {
                locations: req.body.locations
            }
        }
    ).then(result => {
        res.json(result);
    });
});

module.exports = router;