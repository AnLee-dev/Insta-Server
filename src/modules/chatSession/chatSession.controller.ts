import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { pick } from '../utils';
import { IOptions } from '../paginate/paginate';
import { querySessions } from './chatSession.service';

export const getSessions = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['userLine']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await querySessions(filter, options);
  res.send(result);
});

export default getSessions;
