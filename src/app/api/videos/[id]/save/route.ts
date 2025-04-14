import { AuthOptions } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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
    const userId = session.user.id;
    const videoId = new mongoose.Types.ObjectId(id); 
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isSaved = user.savedReels.some((vId: mongoose.Types.ObjectId) => vId.equals(videoId));

    if (isSaved) {
      user.savedReels = user.savedReels.filter((vId: mongoose.Types.ObjectId) => !vId.equals(videoId));
    } else {
      user.savedReels.push(videoId);
    }

    await user.save();

    return NextResponse.json({
        success: true,
        message: isSaved ? "Video removed from saved list" : "Video added to saved list",
        savedVideos: user.savedReels.length,
      });
      
  } catch (error) {
    console.log("Error saving/unsaving video:", error);
    return NextResponse.json(
      { error: "Failed to save/unsave video" },
      { status: 500 }
    );
  }
}
