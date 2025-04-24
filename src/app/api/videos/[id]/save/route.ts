import { AuthOptions } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User";
import Video from "@/models/Video";
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

    const { id } = params;
    const userId = session.user.id;
    const videoId = new mongoose.Types.ObjectId(id);
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isSaved = user.savedReels.some((vId: mongoose.Types.ObjectId) =>
      vId.equals(videoId)
    );

    if (isSaved) {
      user.savedReels = user.savedReels.filter(
        (vId: mongoose.Types.ObjectId) => !vId.equals(videoId)
      );
    } else {
      user.savedReels.push(videoId);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: isSaved
        ? "Video removed from saved list"
        : "Video added to saved list",
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

export async function GET() {
  try {
    const session = await getServerSession(AuthOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectionToDatabase();

    const user = await User.findById(session.user.id);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const savedReelIds = user.savedReels;

    if (!savedReelIds || savedReelIds.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const savedReels = await Video.aggregate([
      {
        $match: {
          _id: { $in: savedReelIds },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          title: 1,
          description: 1,
          videoUrl: 1,
          thumbnailUrl: 1,
          controls: 1,
          transformation: 1,
          likes: 1,
          createdAt: 1,
          updatedAt: 1,
          "user.userName": 1,
          "user.profilePic": 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return Response.json(savedReels);
  } catch (error) {
    console.log("Error fetching saved reels:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved reels" },
      { status: 500 }
    );
  }
}
