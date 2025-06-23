import { AuthOptions } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";

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

    const followings = user.followings;

    const followingVideos = await Video.aggregate([
      {
        $match: {
          userId: { $in: followings },
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
          videoIdImagekit: 1,
          thumbnailUrl: 1,
          controls: 1,
          transformation: 1,
          likes: 1,
          createdAt: 1,
          updatedAt: 1,
          "user.userName": 1,
          "user.profilePicUrl": 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);


    return NextResponse.json(followingVideos);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error :: Failed to fetch user Videos" },
      { status: 500 }
    );
  }
}
