const { Thought } = require('../../models');
//Setting up the routes for express Server . 
const router = require("express").Router();

router.get('/all', (req, res) => {
    Thought.find({})
        .sort({ createdAt: -1 }) //-1 - DESC 1 - ASC 
        .then(dbThoughtData => {
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;