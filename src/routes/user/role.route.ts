import express from 'express';

import { checkPermission } from '../../middlewares/authenticate.middleware';
import roleController from '../../controllers/user/role.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Role
 *     description: Endpoints related to role management
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleDTO'
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleDTO'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: Successfully retrieved roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Internal server error
 */


router.get('/', roleController.list);
router.post('/', roleController.create);
router.patch('/:id', roleController.update);

export default router;
