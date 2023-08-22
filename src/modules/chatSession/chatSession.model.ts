import mongoose, { Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import { TSessionDoc, TSessionDocModel } from './chatSession.interfaces';
import paginate from '../paginate/paginate';

const sessionSchema = new mongoose.Schema<TSessionDoc, TSessionDocModel>(
  {
    status: {
      type: Boolean,
      default: false,
    },
    currentStep: {
      type: Number,
      default: 0,
    },
    userLine: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    questionnaires: {
      type: Array,
      default: [],
    },
    mettingDate: {
      type: String,
    },
    metting: { type: Schema.Types.ObjectId, ref: 'Metting', required: false },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
sessionSchema.plugin(toJSON);
sessionSchema.plugin(paginate);

const ChatSession = mongoose.model<TSessionDoc, TSessionDocModel>('ChatSession', sessionSchema);

export default ChatSession;
