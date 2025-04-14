"use client";
import React, { useState } from "react";
import {
  Home,
  Search,
  PlusSquare,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  Clapperboard,
  Film,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfilePic from "./UserComps/ProfilePic";
import { useUserProfile } from "./UserProfileContext";
import Logo from "./Logo";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active,
  onClick,
  href,
}) => {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className={`flex items-center cursor-pointer w-full p-3 rounded-lg transition-colors ${
          active
            ? "bg-blue-100 text-blue-600 dark:text-blue-300 dark:bg-gray-900"
            : "text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900  dark:text-gray-100"
        }`}
      >
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <span className="font-medium">{label}</span>
        </div>
      </button>
    </Link>
  );
};

export default function SideNavbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [collapsed, setCollapsed] = useState(false);
  const {user} = useUserProfile()

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  const {data:session} = useSession()

  const navItemsData: {
    icon: React.JSX.Element;
    label: string;
    href: string;
  }[] = [
    {
      icon: <Home size={20} />,
      label: "Home",
      href: "/",
    },
    {
      icon: <Search size={20} />,
      label: "Discover People",
      href: "/search",
    },
    {
      icon: <Clapperboard size={20} />,
      label: "Following",
      href: "/followings",
    },
    {
      icon: <Film size={20} />,
      label: "Reels",
      href: "/reels",
    },
    {
      icon: <PlusSquare size={20} />,
      label: "Create",
      href: "/upload",
    },
    {
      icon: <Heart size={20} />,
      label: "Notifications",
      href: "/notifications",
    },
    {
      icon: <Bookmark size={20} />,
      label: "Saved",
      href: "/saved",
    },
    {
      icon: <ProfilePic size="sm" name={user?.name!} url={user?.profilePicUrl!}  />,
      label: session?.user.username || "Profile",
      href: `/${session?.user.username}`,
    },
  ];

  return (
    <>
    <div className={`${collapsed ? "w-12" : "w-64"}`}></div>
    <div
      className={`fixed top-0 z-50 bottom-0 left-0 h-screen bg-white dark:bg-black/95   border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } max-sm:hidden`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        {!collapsed && (
        //   <h1 className="text-xl font-bold text-blue-600">ReelSocial</h1>
        <Logo />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg hover:bg-gray-100"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <div className="p-2">
        <div className="space-y-2">
            {navItemsData.map((nav) => (
          <NavItem
          key={nav.label}
            icon={nav.icon}
            label={collapsed ? "" : nav.label}
            active={activeItem === nav.label}
            onClick={() => handleItemClick(nav.label)}
            href={nav.href}
          />
        ))}
        </div>
      </div>
    </div>
    </>
  );
}
