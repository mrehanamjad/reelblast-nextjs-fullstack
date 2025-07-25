import mongoose, { Schema } from "mongoose";

export interface CommentI {
  userId: mongoose.Types.ObjectId;
  videoId?: mongoose.Types.ObjectId; 
  parentCommentId?: mongoose.Types.ObjectId | null; 
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CommentSchema: Schema = new Schema<CommentI>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null
    },
    content: { 
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

CommentSchema.index({ videoId: 1 });
CommentSchema.index({ parentCommentId: 1 });

const Comment =
  mongoose.models.Comment || mongoose.model<CommentI>("Comment", CommentSchema);
export default Comment;
