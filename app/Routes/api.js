const router = require('express').Router();

const config = require('../config');
const { allowOnly } = require('../helpers/routesHelper');
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const AdminController = require('../controllers/adminController');
const BuildingController = require('../controllers/buildingController');
const ListingController = require('../controllers/listingController');

const APIRoutes = (passport) => {
  router.post('/signup', AuthController.signUp);
  router.post('/authenticate', AuthController.authenticateUser);
  router.post('/refresh_token', AuthController.refresh_token);
  router.post('/verify', AuthController.verifyAcount);
  router.post('/building', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, BuildingController.index));
  router.post('/listing', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, ListingController.index));

  router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
  router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));
  router.get('/getbuilding', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, BuildingController.getIndex));
  router.get('/getlisting', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, ListingController.getIndex));

  return router;
};

module.exports = APIRoutes;
