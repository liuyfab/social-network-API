//Setting up the routes for express Server . 
const router =  require("express").Router(); 
const userRoutes = require('./user-routes'); 
const thoughtsRoutes = require('./thought-routes')

// 'api/users/'
router.use('/users', userRoutes); 
// 'api/thoughts/'
router.use('/thoughts', thoughtsRoutes )

module.exports = router; 