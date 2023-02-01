const router = require('express').Router();



const controller = require('../controller/index');
// router.get('/movie', controller.getAllMovies);
// router.get('/movie/:id', controller.getMovieByID);
// router.post('/movie', controller.postNewMovie);
router.use('/movie', require('./movie'));

router.use('/', require('./swagger'));

module.exports = router;