const router = require('express').Router();
const {
  login,
} = require('../controllers/users');
const { signinValid } = require('../middlewares/routesValidators');

router.post('/', signinValid, login);

module.exports = router;
