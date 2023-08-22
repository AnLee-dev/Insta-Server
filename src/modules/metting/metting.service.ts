import httpStatus from 'http-status';
import { ApiError } from '../errors';
import { TMetting, TMettingDoc, UpdateMettinfBody } from './metting.interfaces';
import Metting from './metting.model';
import { IOptions, QueryResult } from '../paginate/paginate';

/**
 * Create metting
 * @param {TMetting} Mettingbody
 * @returns {Promise<TMettingDoc>}
 */
export const createMetting = async (userBody: TMetting): Promise<TMettingDoc> => {
  return Metting.create(userBody);
};

/**
 * Update meeting by userlineId
 * @param {String} userlineId
 * @param {UpdateUserBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateMettingById = async (userLine: string, updateBody: UpdateMettinfBody): Promise<TMettingDoc | null> => {
  const metting = await Metting.findOne({ userLine });
  if (!metting) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Metting not found');
  }
  Object.assign(metting, updateBody);
  await metting.save();
  return metting;
};

/**
 * Query for meetings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryMeetings = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const meetings = await Metting.paginate(filter, options);
  return meetings;
};
