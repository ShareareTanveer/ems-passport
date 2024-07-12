import express from 'express';

import { checkPermission } from '../../middlewares/authenticate.middleware';
import roleController from '../../controllers/user/role.controller';

const router = express.Router();

router.get('/', checkPermission('read', 'role'), roleController.list);
router.post('/',checkPermission('read', 'role'), roleController.create);
router.patch('/:id',checkPermission('update', 'role'),roleController.update);

export default router;
