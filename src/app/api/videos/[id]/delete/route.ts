import { connectionToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(AuthOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectionToDatabase();

    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.indexOf("videos") + 1]; 

    if (!id) {
      return NextResponse.json({ error: "Video ID is missing" }, { status: 400 });
    }

    const video = await Video.findById(id);

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    if (video.userId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await video.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting video:", error);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
}
