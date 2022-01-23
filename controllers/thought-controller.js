// Require Thought and User Models
const { Thought, User } = require('../models');

const thoughtController = {

    // Create a new thought
    addThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err)); 
    },

    // Get all Thoughts
    getAllThoughts(req,res) {
        Thought.find({})
          .select('-__v')
          .sort({ _id: -1 })//-1 - DESC 1 - ASC 
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
    },

    //Get a thought by its _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
          .select('-__v')
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404)
                .json({ message: `No thought found with id: ${params.thoughtId}` });
              return;
            }
            res.json(dThoughtbData);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    // Update Thought by its id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId }, body,
          { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404)
                .json({ message: `No thought found with id: ${params.thoughtId}` });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
    
     // Delete  a thought from user by its id
     removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404)
                .json({ message: `No thought to delete with id: ${params.thoughtId}` });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      }, 

    // Create a reaction 
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404)
                .json({ message: `No thought found with id: ${params.thoughtId}` });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },

      // Delete a reaction
      removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then(dbThoughtData => {
            if (!dbThoughData) {
              res.status(404)
                .json({ message: `No thought found with id: ${params.thoughtId}` });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      }
}//Thought controller

module.exports = thoughtController;
    
