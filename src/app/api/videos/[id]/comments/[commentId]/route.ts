import { AuthOptions } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";



export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectionToDatabase();

    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const commentId = segments[segments.indexOf("comments") + 1];
    if (!commentId) {
      return NextResponse.json({ error: "Comment ID is missing" }, { status: 400 });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Only allow the owner to delete
    if (comment.userId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    // delete all child replies
    await Comment.deleteMany({ parentCommentId: new mongoose.Types.ObjectId(commentId) });

    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}

