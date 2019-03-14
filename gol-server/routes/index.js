var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *    get:
 *      description: Index route, shouldn't really do anything.
 *    responses:
 *      200:
 *        description: Ok
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Meaning of Life Server' });
});

module.exports = router;
