import express from 'express';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import permissionController from '../../controllers/user/permission.controller';
import { CreatePermissionDTO, UpdatePermissionDTO } from '../../services/dto/permission/create-update-permission.dto';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
console.log("permission router")
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Permission
 *     description: Endpoints related to Permission management
 */

/**
 * @swagger
 * /permission:
 *   get:
 *     summary: Get all permission
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: List of permission
 *       500:
 *         description: Internal server error
 */
router.get('/', permissionController.list);
router.post('/', validateDTO(CreatePermissionDTO),permissionController.create);
router.patch('/:id', validateDTO(UpdatePermissionDTO),permissionController.update);
export default router;
