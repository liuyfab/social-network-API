const { User, Thought } = require('../models');

const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .populate({
            path: 'friends',
            select: '-__v'
          })
          .select('-__v') // .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

      // Creat a user format 
     /* {
        "username": "lernantino",
        "email": "lernantino@gmail.com"
      }*/

     addUser({ body }, res) {
       User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

      //Get a user by its id
      getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .populate({
            path: 'friends',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404)
                .json({ message: `No user found with id: ${params.id}` });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
        },

         // Update user by its id
         updateUser({ params, body }, res) {
            User.findOneAndUpdate(
              { _id: params.id }, body,
              { new: true, runValidators: true }
            )
              .select('-__v')
              .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: `No user found with id: ${params.id}` });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.json(err));
          },

         // Delete a user by its id
         deleteUser({ params }, res) {
            User.findOneAndDelete({ _id: params.id })
              .select('-__v')
              .then(async dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: `No user found with id: ${params.id}` });
                  return;
                }
                // The thoughts array has ids of this user's Thought objects
                // delete all those Thought obects along with this user 
                if (dbUserData.thoughts && dbUSerData.thoughts.length) {
                  const deleteManyStatus = await Thought.deleteMany({ _id: { $in: dbData.thoughts } });
                }
                res.json(dbData);
              })
              .catch(err => res.json(err));
        },

         // Add a new friend to a user's friend list
         addFriend({ params }, res) {
            User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { friends: params.friendId } },
              { new: true, runValidators: true }
            )
              .select('-__v')
              .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404)
                    .json({ message: `No user found with id: ${params.id}` });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.json(err));
          },

          //Remove a friend from a user's friend list
          removeFriend({ params }, res) {
            User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { friends: params.friendId } },
              { new: true }
            )
              .select('-__v')
              .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: `No user found with id: ${params.id}` });
                  return;
                }
                res.json(dbUSerData);
              })
              .catch(err => res.json(err));
          },
        }
        
        module.exports = userController;

    