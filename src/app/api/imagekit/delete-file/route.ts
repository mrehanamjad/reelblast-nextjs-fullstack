import { NextResponse } from "next/server";
import { imagekit } from "../imagekit-auth/route";

export async function DELETE(req: Request) {
  const { id, fileType } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: `${fileType || "file"} ID is required` },
      { status: 400 }
    );
  }

  try {
    const result = await new Promise((resolve, reject) => {
      imagekit.deleteFile(id, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    console.log(`${fileType || "File"} deleted successfully:`, result);
    return NextResponse.json({
      success: true,
      message: `${fileType || "File"} deleted successfully`,
    });
  } catch (error) {
    console.error(`Error deleting ${fileType || "file"}:`, error);
    return NextResponse.json(
      { error: `Failed to delete ${fileType || "file"}` },
      { status: 500 }
    );
  }
}
