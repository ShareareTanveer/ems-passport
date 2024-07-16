import express, { NextFunction } from 'express';
import httpStatusCodes from 'http-status-codes';

// Services
import userService from '../services/user/user.service';

// Interfaces
import IRequest from '../interfaces/IRequest';

// Utilities
import ApiResponse from '../utilities/api-response.utility';
import Encryption from '../utilities/encryption.utility';
import ApiUtility from '../utilities/api.utility';

// Constants
import constants from '../constants';

// entity
import { User } from '../entities/user/user.entity';
import { Permission } from '../entities/user/permission.entity';

// config
import dataSource from '../configs/orm.config';


export default async (
  req: IRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (constants.APPLICATION.authorizationIgnorePath.indexOf(`${req.originalUrl}`) === -1) {
    const authorizationHeader = ApiUtility.getCookieFromRequest(req, constants.COOKIE.COOKIE_USER);

    if (authorizationHeader) {
      const decoded = await Encryption.verifyCookie(authorizationHeader);

      if (decoded) {
        const user = await userService.getById({ id: decoded.data[constants.COOKIE.KEY_USER_ID] });
        if (user) {
          // @ts-ignore
          req.user = user;
        } else {
          return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
        }
      } else {
        return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
      }
    } else {
      return ApiResponse.error(res, httpStatusCodes.FORBIDDEN);
    }
  }

  next();
};


export const checkPermission = (action: string, modelName: string) => {
  return async (req: any, res: any, next: NextFunction) => {
    const userRepository = dataSource.getRepository(User);
    const permissionRepository = dataSource.getRepository(Permission);
    try {
      const user = await userRepository.findOne({where:{id: req.user.id},relations:['role', 'role.permissions']});
      if (!user) {
        return res.status(403).json({ message: 'Unauthorized: User not found' });
      }
      const permission = await permissionRepository.findOne({ where: { codename: `${action}_${modelName}` } });
      if (!permission) {
        return res.status(403).json({ message: 'Unauthorized: Permission not found' });
      }
      const hasPermission = user.role.permissions.some(p => p.codename === `${action}_${modelName}`);
      if (hasPermission) {
        next();
      } else {
        return res.status(403).json({ message: 'Unauthorized: Insufficient permissions' });
      }
    } catch (error) {
      console.error('Error checking permission:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};