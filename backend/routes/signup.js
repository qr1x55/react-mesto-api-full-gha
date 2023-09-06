const router = require('express').Router();
const {
  addUser,
} = require('../controllers/users');
const { signupValid } = require('../middlewares/routesValidators');

router.post('/', signupValid, addUser);

module.exports = router;
