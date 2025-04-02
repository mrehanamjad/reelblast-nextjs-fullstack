import { AuthOptions } from "@/lib/auth";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface FollowI {
  followerId: string;
  followingId: string;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(AuthOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectionToDatabase();

    const { followerId, followingId }: FollowI = await req.json();

    if (!followerId || !followingId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isFollowing = follower.followings.includes(followingId);

    if (isFollowing) {
      // Unfollow: Remove from both lists
      follower.followings = follower.followings.filter(
        (id:any) => id.toString() !== followingId
      );
      following.followers = following.followers.filter(
        (id:any) => id.toString() !== followerId
      );
    } else {
      // Follow: Add to both lists
      follower.followings.push(followingId);
      following.followers.push(followerId);
    }

    await Promise.all([follower.save(), following.save()]);

    return NextResponse.json({
      message: isFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
    });
  } catch (error) {
    console.error("Error in follow API:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
