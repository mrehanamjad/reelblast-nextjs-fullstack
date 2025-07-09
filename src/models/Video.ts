import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENTIONS = {
  width: 1080,
  height: 1920,
} as const; // with as const : we can not modify it

/*
    as const makes everything readonly and preserves literal values.
    Types/interfaces define structures but do not enforce exact values.
    If you want fixed constants, use as const instead of a type or interface.

    How Type script behaves:
    🔹 Without as const TypeScript treats this as: { width: number; height: number; }
    🔹 With as const TypeScript treats this as: { readonly width: 1080; readonly height: 1920; }

*/

export interface VideoI {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  videoIdImagekit: string; 
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  likes?: mongoose.Types.ObjectId[]; 
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<VideoI>(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    videoIdImagekit: { type: String, required: true },
    thumbnailUrl: { type: String },
    controls: { type: Boolean, default: true },
    transformation: {
      height: { type: Number, default: VIDEO_DIMENTIONS.height },
      width: { type: Number, default: VIDEO_DIMENTIONS.width },
      quality: { type: Number, min: 1, max: 100 },
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);


const Video = models.Video || model<VideoI>('Video',videoSchema);

export default Video