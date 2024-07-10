import express from 'express';
const schemaValidator = require('express-joi-validator');

import { checkPermission } from '../../middlewares/authenticate.middleware';
import roleController from '../../controllers/user/role.controller';

const router = express.Router();

router.post(
  '/',
  checkPermission('read', 'role'),
  roleController.create,
);

router.put(
  '/:id',
  // checkPermission('read', 'user'),
  roleController.update,
);

router.get('/', roleController.list);

export default router;
