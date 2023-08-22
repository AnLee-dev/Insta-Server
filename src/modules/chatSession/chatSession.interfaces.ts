import { Model, Document, Types } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface Questionnaires {
  question: string;
  answer: string;
}

export interface TSession {
  status: boolean;
  currentStep: number;
  userLine: string;
  userName: string;
  questionnaires?: string[];
  mettingDate?: string;
  metting?: Types.ObjectId;
}

export interface TSessionDoc extends TSession, Document {}

export interface TSessionDocModel extends Model<TSessionDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
