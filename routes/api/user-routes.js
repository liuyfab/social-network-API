/*


GET a single user by its _id and populated thought and friend data

POST a new user:

// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
PUT to update a user by its _id

DELETE to remove user by its _id
*/
const { User } = require('../../models');
//Setting up the routes for express Server . 
const router = require("express").Router();

// 'api/users/all'  -- GET all users
router.get('/all', (req, res) => {
    User.find({})
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            res.json(err);
        });
});
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