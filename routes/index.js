const router = require('express').Router();



const controller = require('../controller/index');
router.get('/movie', controller.getAllMovies);
router.get('/movie/:id', controller.getMovieByID);
router.post('/movie', controller.postNewMovie);

router.use('/', require('./swagger'));
//router.get('/movie', require('./movie'));

module.exports = router;