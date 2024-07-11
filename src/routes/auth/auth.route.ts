import express from 'express';

// Controller
import userController from '../../controllers/user/user.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { RegisterUserDTO } from '../../services/dto/user/user.dto';

const router = express.Router();

router.post(
  '/register',
  validateDTO(RegisterUserDTO),
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
