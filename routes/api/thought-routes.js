//Setting up the routes for express Server . 
const router = require("express").Router();
const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');
  
// Get all thoughts
router
  .route('/')
  .get(getAllThoughts);

// create a thought for a user
// 'api/thoughts/:userid 
router
  .route('/:userId')
  .post(addThought)

// Get, update, delete a thought by its id
router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// create a reaction to a thought
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// delete a reaction by its id 
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;