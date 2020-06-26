const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.Counter.find({}).then(result => {
        res.json(result);
    });
});

router.get('/get', (req, res) => {
    db.Counter.find({ voterId: req.body.voterId }).then(result => {
        res.json(result);
    });
});

router.post('/create', (req, res) => {
    db.Counter.create({
        voterId: req.body.voterId,
        suggestion: req.body.suggestion,
        counter: req.body.counter
    }).then(result => {
        res.json(result);
    });
});

router.post('/updateCount/:id', (req, res) => {
    db.Counter.update({
        counter: req.body.counter
    }, {
        where: {
            voterId: req.params.id
        }
    }).then(result => {
        res.json(result);
    });
});


module.exports = router;