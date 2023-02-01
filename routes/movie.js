const routes = require('express').Router();
const controller = require('../controller/index');


routes.get('/', controller.getAllMovies);
routes.get('/:id', controller.getMovieByID);
routes.post('/', controller.postNewMovie);


module.exports = routes;