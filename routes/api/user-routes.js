//Setting up the routes for express Server . 
const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

// get all users & create a new user
router
  .route('/')
  .get(getAllUsers)
  .post(addUser);

//get, update, delete user by its id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//  add, remove a friend from a user's friend array
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);


module.exports = router;

/*
app.post('/submit', ({ body }, res) => {
    Note.create(body)
      .then(dbNote => {
        res.json(dbNote);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  

  

app.post('/update/:id', ({ params, body }, res) => {
    Note.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbNote => {
        if (!dbNote) {
          res.json({ message: 'No note found with this id!' });
          return;
        }
        res.json(dbNote);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.delete('/delete/:id', ({ params }, res) => {
    Note.findOneAndDelete({ _id: params.id })
      .then(dbNote => {
        if (!dbNote) {
          res.json({ message: 'No note found with this id!' });
          return;
        }
        res.json(dbNote);
      })
      .catch(err => {
        res.json(err);
      });
  });

  */

  module.exports = router; 