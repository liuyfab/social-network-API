//Setting up the routes for express Server . 
const router =  require("express").Router(); 
const apiRoutes = require('./api'); 

router.use('/api', apiRoutes); 

module.exports = router; 