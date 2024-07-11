import express from 'express';

// Controller
import userController from '../../controllers/user/user.controller';

import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { RegisterUserDTO } from '../../services/dto/user/user.dto';
import { changePasswordDTO, sendEmailOtpDTO, verifyEmailOtpDTO } from '../../services/dto/auth/auth.dto';

const router = express.Router();

router.post(
  '/register',
  validateDTO(RegisterUserDTO),
  userController.create,
);

router.post('/login', userController.login);

router.post('/send-email-otp', validateDTO(sendEmailOtpDTO), userController.sendEmailOtp);
router.post('/verify-email-otp', validateDTO(verifyEmailOtpDTO), userController.verifyEmailOtp);
router.post('/change-password', validateDTO(changePasswordDTO), userController.changePassword);


router.post('/logout', userController.logout);

export default router;
