const routes = require('express').Router();
const controller = require('../controller/index');
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:8080',
    clientID: 'uXyuYIWzBKhaWKRWLcS5qK6lMVn5UYeD',
    issuerBaseURL: 'https://dev-5sjvxvs7q7lwekt2.us.auth0.com'
  };
 routes.use(auth(config));
  


routes.get('/', requiresAuth(), controller.getAllMovies);
routes.get('/:id', controller.getMovieByID);
routes.post('/',controller.postNewMovie);
routes.delete('/:id', controller.deleteMovie);
routes.put('/:id', controller.updateMovie);


module.exports = routes;