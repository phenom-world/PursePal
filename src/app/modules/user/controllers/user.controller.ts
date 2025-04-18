import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { paginateResponse } from '../../../../shared/helpers/paginate-response.helper';
import { ApiResponse } from '../../../../shared/utils/helper.util';
import { asyncHandler } from '../../../middlewares';
import UserService from '../services/user.service';

class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // get loggedin user
  getMe = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const user = await this.userService.getUser(userId);
    return ApiResponse(res, StatusCodes.OK, user);
  });

  // get all users
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const { paginate } = res.locals;
    const users = await this.userService.getAllUsers(paginate, req.query);
    return ApiResponse(res, StatusCodes.OK, paginateResponse({ rows: users.records, paginate, count: users.count }));
  });

  // delete user
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.userService.deleteUser(id);
    return ApiResponse(res, StatusCodes.OK, null, 'User deleted successfully');
  });
}

export default UserController;
