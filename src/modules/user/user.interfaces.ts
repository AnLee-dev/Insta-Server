import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface IUser {
  userName: string;
  fullName?: string;
  profilePicUrl?: string;
  userBio?: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
}

export interface IUserDoc extends IUser, Document {
  id: mongoose.Types.ObjectId;
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
  initFirstUser(): Promise<IUserDoc>;
}

export type UpdateUserBody = Partial<IUser>;

export type IRegisteredUser = Omit<IUser, 'role' | 'isEmailVerified'>;

export type ICreatedUser = Omit<IUser, 'isEmailVerified'>;

export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessAndRefreshTokens;
}
