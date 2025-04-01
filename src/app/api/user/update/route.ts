import { connectionToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const { userId, name, username, bio, profilePicUrl, socialLinks } = await req.json();
        await connectionToDatabase();
    } catch (error) {
        
    }
}