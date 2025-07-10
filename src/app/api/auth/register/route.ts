import { NextRequest, NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email, password,userName, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and Password are required" },
        { status: 400 }
      );
    }

    await connectionToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    await User.create({ email, password,userName,name });

    return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
    );

  } catch (error) {
    console.log("Error in user registration:", error);
        return NextResponse.json(
            { error: "Server Error. Try again later." },
            { status: 500 }
        )
  }
}
