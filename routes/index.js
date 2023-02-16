const router = require('express').Router();
// const { auth, requiresAuth } = require('express-openid-connect');

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: 'a long, randomly-generated string stored in env',
//     baseURL: 'http://localhost:8080',
//     clientID: 'uXyuYIWzBKhaWKRWLcS5qK6lMVn5UYeD',
//     issuerBaseURL: 'https://dev-5sjvxvs7q7lwekt2.us.auth0.com'
//   };



router.use('/movie', require('./movie'));

router.use('/', require('./swagger'));

module.exports = router;