const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.Votes.find({}).then(result => {
        res.json(result);
    });
});

router.get('/getName/:name', (req, res) => {
    db.Votes.findOne({
        name: req.params.name
    }).then(result => {
        res.json(result);
    });
});

router.post('/name', (req, res) => {
    db.Votes.create({
        name: req.body.name,
        tshirt: req.body.tshirt
    }).then(result => {
        res.json(result);
    });
});

router.post('/tshirt/:name', (req, res) => {
    db.Votes.findOneAndUpdate({
        tshirt: req.body.tshirt
    }, {
        where: { name: req.params.name }
    }).then(result => {
        res.json(result);
    });
});

router.post('/dates/:name', (req, res) => {
    db.Votes.findOneAndUpdate({ name: req.params.name },
        {
            $push: {
                dates: req.body.dates
            }
        }
    ).then(result => {
        res.json(result);
    });
});

router.post('/locations/:name', (req, res) => {
    db.Votes.findOneAndUpdate({ name: req.params.name },
        {
            $push: {
                locations: req.body.locations
            }
        }
    ).then(result => {
        res.json(result);
    });
});

router.post('/suggestions/:name', (req, res) => {
    db.Votes.findOneAndUpdate({ name: req.params.name },
        {
            $push: {
                suggestions: req.body.suggestions
            }
        }
    ).then(result => {
        res.json(result);
    });
});

router.delete('/delete/:id', (req, res) => {
    db.Votes.findOneAndDelete({
        _id: req.params.id
    }).then(result => {
        res.json(result);
    });
});

module.exports = router;