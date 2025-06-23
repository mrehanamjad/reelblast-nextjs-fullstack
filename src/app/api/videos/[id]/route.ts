import { connectionToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
) {
  try {
    await connectionToDatabase();

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const video = await Video.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }
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
          videoIdImagekit: 1,
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
    ]);

    if (!video || video.length === 0) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(video[0]);
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
  }
}
