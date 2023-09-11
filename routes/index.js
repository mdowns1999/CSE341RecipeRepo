const router = require('express').Router();
//const { requiresAuth } = require('express-openid-connect');

//AUTHO test routes
  // router.get('/', (req, res) => {
  //   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  // });

  // router.get('/profile', requiresAuth(), (req, res) => {
  //   res.send(JSON.stringify(req.oidc.user));
  // });
//router.use('/test', require('./test'));

  //Normal Routes
router.use('/movie', require('./movie'));
//router.use('/test', require('./hello'));

router.use('/', require('./swagger'));

module.exports = router;