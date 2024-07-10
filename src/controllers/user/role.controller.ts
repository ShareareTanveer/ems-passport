import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';
import {
    ICreateRole,
    IUpdateRole,
} from '../../interfaces/role.interface';

// Services
import roleService from '../../services/user/role.service';

// Utilities
import ApiResponse from '../../utilities/api-response.utility';

// Constants

const create: IController = async (req, res) => {
  try {
    const params: ICreateRole = {
      name: req.body.name,
      permissions: req.body.permissions,
      users: req.body.permissions,
    }
    const role = await roleService.create(params);
    return ApiResponse.result(res, role, httpStatusCodes.CREATED);
  } catch (e) {
    console.error('Error creating role:', e);
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};


const update: IController  = async (req, res) => {
    try {
        const id: number= parseInt(req.params.id, 10)
        const params:IUpdateRole = {
            name: req.body.name,
            permissions: req.body.permissions,
            users: req.body.users,
        };
        const role = await roleService.update(id, params);
        return ApiResponse.result(res, role, httpStatusCodes.OK);
    } catch (e) {
        console.error('Error updating role:', e);
        return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
    }
};



const list: IController = async (req, res) => {
  try {
    const data = await roleService.list();
    return ApiResponse.result(res, data, httpStatusCodes.OK, null);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

export default {
  create,
  list,
  update
};
