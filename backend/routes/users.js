const router = require('express').Router();
const {
  getUrers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUser,
} = require('../controllers/users');
const { validateUserId, validateUserProfile, validateUpdateAvatar } = require('../middlewares/validators');

router.get('/users', getUrers);
router.get('/users/me', getUser);
router.get('/users/:userId', validateUserId, getUserById);
router.patch('/users/me', validateUserProfile, updateProfile);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
