import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface TMetting {
  zoomId: string;
  userLine: string;
  userName: string;
  timeStart: Date;
  linkHost: string;
  linkJoin: string;
  status?: boolean;
}

export interface TMettingDoc extends TMetting, Document {}

export interface TMettingDocModel extends Model<TMettingDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateMettinfBody = Partial<TMetting>;
