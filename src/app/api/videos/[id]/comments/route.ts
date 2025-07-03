import { AuthOptions } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import Comment, { CommentI } from "@/models/Comment";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";


export async function GET(request: NextRequest) {
  try {
    await connectionToDatabase();
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const videoId = segments[segments.indexOf("videos") + 1];

    const comments = await Comment.aggregate([
      { $match: { videoId: new mongoose.Types.ObjectId(videoId) } },

      // Lookup user info for comment authors
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // Lookup replies for each comment
      {
        $lookup: {
          from: "comments", // assuming Reply is also in "comments" collection
          localField: "_id",
          foreignField: "parentCommentId", // replies reference this
          as: "replies",
        },
      },

      // Lookup user info for each reply author
      {
        $lookup: {
          from: "users",
          localField: "replies.userId",
          foreignField: "_id",
          as: "replyUsers",
        },
      },

      // Merge user info into replies array
      {
        $addFields: {
          replies: {
            $map: {
              input: "$replies",
              as: "reply",
              in: {
                _id: "$$reply._id",
                content: "$$reply.content",
                createdAt: "$$reply.createdAt",
                updatedAt: "$$reply.updatedAt",
                user: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$replyUsers",
                        cond: { $eq: ["$$this._id", "$$reply.userId"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },

      // Project final shape
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          user: { userName: 1, profilePic: 1 },
          replies: 1,
        },
      },

      { $sort: { createdAt: -1 } },
    ]);

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(AuthOptions)
        if (!session) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        await connectionToDatabase();

        const url = new URL(request.url);
        const segments = url.pathname.split("/");
        const id = segments[segments.indexOf("videos") + 1];

        const body = await request.json();
        const { content,parentCommentId } = body;

        if (!content || content.trim() === "") {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        const video = await Video.findById(id);
        if (!video) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }
        
        
        const commentData: CommentI = {
            userId: new mongoose.Types.ObjectId(session.user.id),
            videoId: video._id,
            content: content.trim(),
            parentCommentId: new mongoose.Types.ObjectId(parentCommentId as string) || null,
        }

        const newComment = await Comment.create(commentData);
        if (!newComment) {
            return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
        }
        return NextResponse.json(newComment, { status: 201 });


    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { error: "Failed to create comment" },
            { status: 500 }
        );
    }
}
    