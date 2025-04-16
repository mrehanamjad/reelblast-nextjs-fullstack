"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";
import { Avatar } from "@mantine/core";
import ProfilePic from "./UserComps/ProfilePic";
import { useUserProfile } from "./UserProfileContext";

export default function Header() {
  const { data: session } = useSession();
  console.log("use session data", session);
  console.log("use session username", session?.user.name);

  const {user} = useUserProfile()

  async function handleSignout() {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <header className="bg-gray-900 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* <h1 className="text-white text-2xl font-bold">MyApp</h1> */}
        <Logo />
        <nav className="flex gap-6 items-center">
          <Link href="/" className="text-gray-300 text-lg hover:text-white">
            Home
          </Link>
          {!session ? (
            <>
              <Link
                href="/login"
                className="text-gray-300 text-lg hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-300 text-lg hover:text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
            <Link
                href="/upload"
                className="text-gray-300 text-lg hover:text-white"
              >
                Upload
              </Link>
            <Link
                href={`/${session?.user.username}`}
                className="text-gray-300 text-lg hover:text-white"
              >
                <ProfilePic url={user?.profilePicUrl!} name={session?.user.username!} />
              </Link>
            <button
              onClick={handleSignout}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Logout
            </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}



