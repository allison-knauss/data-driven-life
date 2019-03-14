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

/**
 * @swagger
 * /universe/{id}:
 *    get:
 *      description: Retrives an existing universe
 *    responses:
 *      200:
 *        description: State of the requested universe
 *      404:
 *        description: If the specified universe can't be found
 */
router.get('/:id', function(req, res, next) {
    res.send(universeProvider.getUniverse(req.params.id));
});

/**
 * @swagger
 * /universe/{id}/step:
 *    get:
 *      description: Advances the universe and returns the result
 *    responses:
 *      200:
 *        description: State of the stepped universe
 */
router.get('/:id/step', function(req, res, next) {
    res.send(universeProvider.stepUniverse(req.params.id));
});


module.exports = router;
