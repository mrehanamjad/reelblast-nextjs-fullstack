import { connectionToDatabase } from "@/lib/db";
import User, { UserI } from "@/models/User";
import { NextResponse } from "next/server";

type UserPublicInfoT = Omit<UserI, "password" | "email">;

export async function GET(req: Request) {
  try {
    await connectionToDatabase();

    // Extract username from the dynamic route
    const url = new URL(req.url);
    const username = url.pathname.split("/").pop(); // Or use regex if needed
    if (!username) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    const user = await User.findOne({ userName: username });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const publicInfo: UserPublicInfoT & { userId: string } = {
      userId: user._id.toString(),
      userName: user.userName,
      name: user.name,
      bio: user.bio,
      phone: user.phone,
      createdAt: user.createdAt,
      profilePic: {
        url: user.profilePic.url,
        id: user.profilePic.id,
      },
      followers: user.followers,
      followings: user.followings,
      savedReels: user.savedReels,
      socialLinks: user.socialLinks,
    };

    return NextResponse.json(publicInfo);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
