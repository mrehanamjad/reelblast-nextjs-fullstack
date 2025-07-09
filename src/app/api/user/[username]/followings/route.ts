import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectionToDatabase();

    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const username = segments[segments.indexOf("user") + 1];
    if (!username) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    const user = await User.findOne({ userName: username });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const followingIds = user.followings;

    if (!followingIds || followingIds.length === 0) {
      return NextResponse.json({ followings: [] }, { status: 200 });
    }

    const followingsData = await User.find({ _id: { $in: followingIds } }).select(
      "_id name userName bio profilePic"
    );

    return NextResponse.json(followingsData);
  } catch (error) {
     console.error("Error fetching followings:", error);
    return NextResponse.json(
      { message: "Server error :: Error fetching followings"},
      { status: 500 }
    );
  }
}
