const routes = require('express').Router();
const controller = require('../controller/index');
const { check } = require('express-validator');


routes.get('/', controller.getAllMovies);
routes.get('/:id', controller.getMovieByID);
routes.post('/',controller.postNewMovie);
routes.delete('/:id', controller.deleteMovie);
routes.put('/:id', controller.updateMovie);


module.exports = routes;