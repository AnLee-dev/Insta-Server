import { Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import * as postService from './post.service';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const post = await postService.createPost({ ...req.body, userId: res.req.user.id });
  res.status(httpStatus.CREATED).send(post);
});

export const getPostById = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['postId'] === 'string') {
    const post = await postService.getPostById(new mongoose.Types.ObjectId(req.params['postId']));
    if (!post) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    res.send(post);
  }
});

export const getPosts = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['likeCount', 'hasLike']);
  const options: IOptions = pick(req.query, ['User']);
  const result = await postService.queryPost(filter, options);
  res.send(result.results);
});

export const updatePost = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['postId'] === 'string') {
    const Post = await postService.updatePostById(new mongoose.Types.ObjectId(req.params['postId']), req.body);
    res.send(Post);
  }
});

export const deletePost = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['postId'] === 'string') {
    await postService.deletePostById(new mongoose.Types.ObjectId(req.params['postId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
