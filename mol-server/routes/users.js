var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /users:
 *    get:
 *      description: This should return all users
 *    responses:
 *      200:
 *        description: An object with a users key containing a list of users
 */
router.get('/', function(req, res, next) {
  res.send({users: []});
});

module.exports = router;
