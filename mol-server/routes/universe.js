var express = require('express');
var router = express.Router();

const universeProvider = require('../providers/universe-provider');

/**
 * @swagger
 * /universe:
 *    get:
 *      description: Creates and returns state for a new universe
 *    responses:
 *      200:
 *        description: State of the new universe
 */
router.get('/', function(req, res, next) {
  res.send(universeProvider.newUniverse());
});

module.exports = router;
