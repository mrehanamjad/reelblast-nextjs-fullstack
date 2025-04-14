import { connectionToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/auth"; 
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(AuthOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectionToDatabase();

    const {id} =  params;

    const userId = new mongoose.Types.ObjectId(session.user.id); 

    const video = await Video.findById(id);

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const isLiked = video.likes.some((id: mongoose.Types.ObjectId) => id.equals(userId));

    if (isLiked) {
      video.likes = video.likes.filter((id: mongoose.Types.ObjectId) => !id.equals(userId));
    } else {
      video.likes.push(userId);
    }

    await video.save();

    return NextResponse.json({
      success: true,
      message: isLiked ? "Video unliked successfully" : "Video liked successfully",
      totalLikes: video.likes.length
    });
  } catch (error) {
    console.error("Error liking video:", error);
    return NextResponse.json(
      { error: "Failed to like/unlike video" },
      { status: 500 }
    );
  }
}
