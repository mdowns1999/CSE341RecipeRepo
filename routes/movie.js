const routes = require('express').Router();
const controller = require('../controller/index');
const {requiresAuth } = require('express-openid-connect');

routes.get('/test', controller.index);
routes.get('/',requiresAuth(), controller.getAllMovies);
routes.get('/:id', requiresAuth(), controller.getMovieByID);
routes.post('/',controller.postNewMovie);
routes.delete('/:id', controller.deleteMovie);
routes.put('/:id', controller.updateMovie);
routes.get('/test', controller.index);

module.exports = routes;