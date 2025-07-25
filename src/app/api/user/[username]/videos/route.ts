import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectionToDatabase();

    const url = new URL(req.url);
    const urlArray = url.pathname.split("/");
    const username = urlArray[urlArray.length - 2]; 


    if (!username) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    const user = await User.findOne({ userName: username });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    const userReels = await Video.aggregate([
      {
        $match: {
          userId: userId,
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

    return NextResponse.json(userReels);
  } catch (error) {
    console.error("Error fetching user Reels:", error);
    return NextResponse.json({ error: "Failed to fetch user Videos" }, { status: 500 });
  }
}
