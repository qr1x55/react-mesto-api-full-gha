const router = require('express').Router();
const { getUserValid, userInfoValid, userAvatarValid } = require('../middlewares/routesValidators');

const {
  getUsers, getUserById, editUserInfo, editUserAvatar, getMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:userId', getUserValid, getUserById);

router.patch('/me', userInfoValid, editUserInfo);

router.patch('/me/avatar', userAvatarValid, editUserAvatar);

module.exports = router;
