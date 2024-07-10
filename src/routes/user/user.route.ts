import express from 'express';
const schemaValidator = require('express-joi-validator');

// Controller
import userController from '../../controllers/user/user.controller';

// Schema
import userSchema from '../../validations/schemas/user.schema';

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
