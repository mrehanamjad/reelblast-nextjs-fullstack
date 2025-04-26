import { connectionToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import User from "@/models/User";
import Video from "@/models/Video";

export async function GET(request: NextRequest) {
  try {
    await connectionToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const regex = new RegExp(query, "i"); // case-insensitive partial match

    // Search users by name or userName
    const users = await User.find({
      $or: [{ name: { $regex: regex } }, { userName: { $regex: regex } }],
    }).select("name userName profilePic bio"); // only return needed fields

    // Search videos by title or description
    const videos = await Video.find({
      $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
    })
      .select("title description thumbnailUrl videoUrl videoIdImagekit userId")
      .populate("userId", "userName profilePic");

    return NextResponse.json({
      users,
      videos,
    });
  } catch (error) {
    console.error("[SEARCH API ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong while searching" },
      { status: 500 }
    );
  }
}
