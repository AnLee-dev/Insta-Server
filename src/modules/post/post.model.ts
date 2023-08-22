import mongoose, { Schema } from 'mongoose';
import { IPostDoc, IPostModel } from './post.interfaces';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';

const postSchema = new mongoose.Schema<IPostDoc, IPostModel>(
  {
    userId: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    media: [
      {
        mediaUrl: {
          type: String,
          required: true,
        },
        poster: {
          type: String,
          required: false,
          default: '',
        },
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
      required: false,
    },
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [], required: false }],
    captionText: {
      type: String,
      default: '',
      required: false,
    },
    hasLike: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

const Post = mongoose.model<IPostDoc, IPostModel>('Post', postSchema);
export default Post;
