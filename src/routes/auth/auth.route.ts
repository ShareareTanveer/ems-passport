import express from 'express';

// Controller
import userController from '../../controllers/user/user.controller';

const router = express.Router();

router.post(
  '/register',
  userController.create,
);

router.post(
  '/login',
  userController.login,
);

router.post(
  '/logout',
  userController.logout,
);

export default router;
