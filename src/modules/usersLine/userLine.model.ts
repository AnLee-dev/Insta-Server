import mongoose, { Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IUserLineDoc, IUserLineModel } from './userLine.interfaces';

const userLineSchema = new mongoose.Schema<IUserLineDoc, IUserLineModel>(
  {
    userLine: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userName: {
      type: String,
    },
    pictureUrl: {
      type: String,
      required: false,
    },
    statusMessage: {
      type: String,
    },
    language: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    session: [{ type: Schema.Types.ObjectId, ref: 'ChatSession', default: [], required: false }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userLineSchema.plugin(toJSON);
userLineSchema.plugin(paginate);

const UserLine = mongoose.model<IUserLineDoc, IUserLineModel>('UserLine', userLineSchema);

export default UserLine;
