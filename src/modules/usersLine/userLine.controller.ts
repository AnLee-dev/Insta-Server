/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as userLineService from './userLine.service';

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['userLine']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await userLineService.queryUsersLine(filter, options);
  res.send(result);
});
