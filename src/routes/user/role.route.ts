import express from 'express';

import { checkPermission } from '../../middlewares/authenticate.middleware';
import roleController from '../../controllers/user/role.controller';

const router = express.Router();

router.get('/', roleController.list);
router.post('/', roleController.create);
router.patch('/:id', roleController.update);

export default router;
