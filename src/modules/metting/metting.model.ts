import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import { TMettingDoc, TMettingDocModel } from './metting.interfaces';
import paginate from '../paginate/paginate';

const mettingSchema = new mongoose.Schema<TMettingDoc, TMettingDocModel>(
  {
    zoomId: {
      type: String,
      required: true,
    },
    userLine: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    timeStart: {
      type: Date,
    },
    linkHost: {
      type: String,
      required: true,
    },
    linkJoin: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
mettingSchema.plugin(toJSON);
// add plugin paginate
mettingSchema.plugin(paginate);

const Metting = mongoose.model<TMettingDoc, TMettingDocModel>('Metting', mettingSchema);

export default Metting;
