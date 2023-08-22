import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as mettingService from './metting.service';
import { ApiError } from '../errors';

export const getMeetings = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['']);
  const options: IOptions = pick(req.query, ['']);
  try {
    const result = await mettingService.queryMeetings(filter, options);
    res.send(result);
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meetings not found');
  }
});
