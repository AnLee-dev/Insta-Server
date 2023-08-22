import { IOptions, QueryResult } from '../paginate/paginate';
import { IUserLine, IUserLineDoc } from './userLine.interfaces';
import UserLine from './userLine.model';

/**
 * Create a user
 * @param {IUserLine} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUserLine = async (userBody: IUserLine): Promise<IUserLineDoc> => {
  return UserLine.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryUsersLine = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const newOptions = { ...options, populate: 'session' };
  const users = await UserLine.paginate(filter, newOptions);
  return users;
};

/**
 * Find a user
 * @param {IUserLine} userBody
 * @returns {Promise<IUserDoc>}
 */
export const getUserLineById = async (userLine: string): Promise<IUserLineDoc | null> => UserLine.findOne({ userLine });
