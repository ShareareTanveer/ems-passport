import express from 'express';

import { checkPermission } from '../../middlewares/authenticate.middleware';
import roleController from '../../controllers/user/role.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Role
 *     description: Endpoints related to Role management
 */

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Internal server error
 */
router.get('/', roleController.list);

/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Admin
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', roleController.create);

/**
 * @swagger
 * /role/{id}:
 *   patch:
 *     summary: Update a role by ID
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the role to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Moderator
 *     responses:
 *       200:
 *         description: Updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', roleController.update);

export default router;
