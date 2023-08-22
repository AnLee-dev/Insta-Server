/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import Post from './post.model';
import { CreatePost, IPostDoc, UpdatePost } from './post.interfaces';
import { ApiError } from '../errors';
import { IOptions, QueryResult } from '../paginate/paginate';

/**
 *
 * @param {CreatePost} postBody
 * @returns {Promise<IPostDoc>}
 */
export const createPost = async (postBody: CreatePost): Promise<IPostDoc> => {
  return Post.create(postBody);
};

/**
 *
 * @param {mongoose.Types.ObjectId} postId
 * @returns {Promise<IPostDoc>}
 */
export const getPostById = async (postId: mongoose.Types.ObjectId): Promise<IPostDoc | null> =>
  Post.findById(postId).populate('userId');

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryPost = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const newOptions = { ...options, populate: 'userId' };
  const posts = await Post.paginate(filter, newOptions);
  return posts;
};

/**
 * Update post by id
 * @param {mongoose.Types.ObjectId} postId
 * @param {UpdatePost} updateBody
 * @returns {Promise<IPostDoc | null>}
 */
export const updatePostById = async (postId: mongoose.Types.ObjectId, updateBody: UpdatePost): Promise<IPostDoc | null> => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  Object.assign(post, updateBody);
  await post.save();
  return post;
};

/**
 * Delete post by id
 * @param {mongoose.Types.ObjectId} postId
 * @returns {Promise<IPostDoc | null>}
 */
export const deletePostById = async (postId: mongoose.Types.ObjectId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await post.deleteOne();
  return post;
};
