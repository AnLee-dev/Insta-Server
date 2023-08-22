import { Model, Document, Types } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IUserLine {
  userLine: string;
  userName: string;
  pictureUrl: string;
  statusMessage: string;
  language: string;
  address: string;
  phone: string;
  session?: [Types.ObjectId];
}

export interface IUserLineDoc extends IUserLine, Document {}

export interface IUserLineModel extends Model<IUserLineDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
