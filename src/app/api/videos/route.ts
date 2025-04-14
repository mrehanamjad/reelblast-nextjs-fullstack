import { VidI } from "@/lib/api-client";
import { AuthOptions } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import Video, { VideoI } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectionToDatabase();

    const videos:VidI[] = await Video.aggregate([
      {
        $lookup: {
          from: "users", // The collection to join with (users collection)
          localField: "userId", // The field from the Video collection
          foreignField: "_id", // The field from the User collection
          as: "user", // The alias for the matched user data
        },
      },
      {
        $unwind: "$user", // Unwind the user array to include user data in each video object
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
          "user.profilePicUrl": 1, 
        },
      },
      {
        $sort: { createdAt: -1 }, // Sorting by createdAt in descending order
      },
    ])

    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectionToDatabase();
    const body: VideoI = await request.json();

    if (!body.title || !body.description || !body.videoUrl) {
      return NextResponse.json(
        { error: "Missing required Fields" },
        { status: 400 }
      );
    }

    const videoData = {
      ...body,
      likes: [],
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);

    return NextResponse.json(newVideo);
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
