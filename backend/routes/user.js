const router = require('express').Router();

const {
  getUsers,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  userIdValidation,
  userUpdateAvatarValidation,
  userUpdateInfoValidation,
} = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdValidation, getUserId);
router.patch('/me', userUpdateInfoValidation, updateUserInfo);
router.patch('/me/avatar', userUpdateAvatarValidation, updateUserAvatar);

module.exports = router;
