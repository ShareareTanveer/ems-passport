import express from 'express';

// Controller
import userController from '../../controllers/user/user.controller';

// Middleware
import { isAdmin } from '../../middlewares/permission-handler.middleware';
import { checkPermission } from '../../middlewares/authenticate.middleware';

const router = express.Router();

router.get(
  '/',
  checkPermission("read","user"),
  userController.list,
);

router.get(
  '/:id',
  checkPermission("read","user"),
  userController.detail,
);

router.delete(
  '/:id',
  isAdmin(),
  userController.remove,
);

export default router;
