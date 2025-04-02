import { connectionToDatabase } from "@/lib/db";
import User, { UserI } from "@/models/User";
import { NextResponse } from "next/server";

type UserPublicInfoT = Omit<UserI,"password" | "email">
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
      await connectionToDatabase();

      const {id} = await params

      const user = await User.findById(id);
  
      if (!user) {
          return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      const publicInfo: UserPublicInfoT & { userId: string } = {
        userId: user._id,
        userName: user.userName,
        name: user.name,
        bio: user.bio,
        phone: user.phone,
        createdAt: user.createdAt,
        profilePicUrl: user.profilePicUrl,
        followers: user.followers,
        followings: user.followings,
        savedReels: user.savedReels,
        socialLinks: user.socialLinks
      }
     
      return NextResponse.json(publicInfo);
  } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
