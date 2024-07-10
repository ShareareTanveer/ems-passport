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

router.patch(
  '/:id',
  checkPermission('update', 'role'),
  roleController.update,
);

router.get('/',
  checkPermission('read', 'role'), 
  roleController.list);

export default router;
