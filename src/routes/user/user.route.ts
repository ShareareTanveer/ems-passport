import express from 'express';
const schemaValidator = require('express-joi-validator');

// Controller
import userController from '../../controllers/user/user.controller';

// Schema
import userSchema from '../../validations/schemas/user.schema';

// Middleware
import { isAdmin } from '../../middlewares/permission-handler.middleware';

const router = express.Router();

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.get(
  '/',
  userController.list,
);

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.delete(
  '/:id',
  isAdmin(),
  userController.remove,
);

export default router;
