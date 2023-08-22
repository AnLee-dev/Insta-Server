import { Document, Model, Types } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IPost {
  userId: [Types.ObjectId];
  media: [
    {
      mediaUrl: string;
      poster: string;
    }
  ];
  likeCount?: number;
  comment?: [Types.ObjectId];
  captionText?: string;
  hasLike?: boolean;
}

export interface IPostDoc extends IPost, Document {}

export interface IPostModel extends Model<IPostDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
export type CreatePost = Omit<IPost, 'userId' | 'likeCount' | 'comment' | 'hasLike'>;
export type UpdatePost = Partial<IPost>;
