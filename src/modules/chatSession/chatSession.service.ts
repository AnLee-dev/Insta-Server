import { IOptions, QueryResult } from '../paginate/paginate';
import { TSession, TSessionDoc } from './chatSession.interfaces';
import ChatSession from './chatSession.model';

/**
 * Create a user
 * @param {TSession} SessionBody
 * @returns {Promise<TSessionDoc>}
 */
export const createSession = async (userBody: TSession): Promise<TSessionDoc> => {
  return ChatSession.create(userBody);
};

/**
 * Find one session
 * @param {TSession} SessionBody
 * @returns {Promise<TSessionDoc>}
 */
export const findSessionById = async (userLine: string): Promise<TSessionDoc | null> => ChatSession.findOne({ userLine });

/**
 * Find lastest session
 * @param {TSession} SessionBody
 * @returns {Promise<TSessionDoc>}
 */
export const findSessionLastest = async (userLine: string): Promise<TSessionDoc | null> =>
  ChatSession.findOne({ userLine }, {}, { sort: { createdAt: -1 } });

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const querySessions = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const newOptions = { ...options, populate: 'metting' };
  const sessions = await ChatSession.paginate(filter, newOptions);
  return sessions;
};
