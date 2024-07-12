import * as express from 'express';

import defaultRouter from './default/default.route';
import authRouter from './auth/auth.route';
import userRouter from './user/user.route';
import roleRouter from './user/role.route';

const router = express.Router();

router.use('/', defaultRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);

export default router;
