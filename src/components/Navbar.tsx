"use client";
import React, { useState } from "react";
import {
  Home,
  Search,
  PlusSquare,
  Menu,
  X,
  Clapperboard,
  Film,
  LogOut,
  LogIn,
  UserPlus,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfilePic from "./UserComps/ProfilePic";
import { useUserProfile } from "./UserProfileContext";
import Logo from "./Logo";
import { signOut } from "next-auth/react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href: string;
}

export const NavItem: React.FC<NavItemProps> = ({
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
            ? "text-blue-300 bg-gray-900 shadow shadow-black"
            : "hover:bg-gray-900 text-gray-100 hover:shadow-black"
        } ${label=="Logout" && " hover:bg-red-900 text-white"}`}
      >
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <span className="font-medium">{label}</span>
        </div>
      </button>
    </Link>
  );
};

export const MobileNavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active,
  onClick,
  href,
}) => {
  return (
    <Link href={href} className="flex-1">
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${
          active ? "text-blue-300" : "text-gray-100"
        }`}
      >
        <div>{icon}</div>
        <span className="text-[0.6rem] mt-1 font-medium">{label}</span>
      </button>
    </Link>
  );
};

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUserProfile();

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  async function handleSignout() {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  const { data: session } = useSession();

  const navItemsData = [
    {
      icon: <Home size={20} />,
      mobileIcon: <Home size={20} />,
      label: "Home",
      href: "/",
      showOnMobile: true,
      // isLogedIn: true,
    },
    {
      icon: <Search size={20} />,
      mobileIcon: <Search size={20} />,
      label: "Search",
      href: "/search",
      showOnMobile: true,
      // isLogedIn: false,
    },
    {
      icon: <Clapperboard size={20} />,
      mobileIcon: <Clapperboard size={20} />,
      label: "Followings",
      href: "/followings",
      showOnMobile: false,
      // isLogedIn: true,
    },
    {
      icon: <Film size={20} />,
      mobileIcon: <Film size={20} />,
      label: "Reels",
      href: "/",
      showOnMobile: false,
      // isLogedIn: true,
    },
    {
      icon: <PlusSquare size={24} />,
      mobileIcon: <PlusSquare size={20} />,
      label: "Create",
      href: "/video/upload",
      showOnMobile: true,
      // isLogedIn: true,
    },
    {
      icon: (
        <ProfilePic
          size="sm"
          name={user?.name ?? ""}
          url={user?.profilePic.url ?? ""}
        />
      ),
      mobileIcon: (
        <ProfilePic
          size="sm"
          name={user?.name ?? ""}
          url={user?.profilePic.url ?? ""}
        />
      ),
      label: "Profile",
      href: `/${session?.user.username ?? ""}`,
      showOnMobile: true,
      // isLogedIn: true,
    },
    {
      icon: <LogIn size={20} />,
      mobileIcon: <LogIn size={20} />,
      label: "Login",
      href: "/login",
      showOnMobile: true,
      // isLogedIn: false,
    },
    {
      icon: <UserPlus size={20} />,
      mobileIcon: <UserPlus size={20} />,
      label: "Sign Up",
      href: "/register",
      showOnMobile: false,
      // isLogedIn: false,
    },
  ];

  // Filter items based on login status
  const filteredNavItems = navItemsData.filter((item) => {
    if (item.label === "Login" || item.label === "Sign Up") {
      if (session?.user.id) {
        return false;
      } else {
        return true;
      }
    }
    if (item.label === "Profile") {
      if (session?.user.id) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  });

  const logoutData = {
    icon: <LogOut size={20} />,
    mobileIcon: <LogOut />,
    label: "Logout",
    href: "",
    showOnMobile: true,
    onClick: handleSignout,
  };

  // Filter items for mobile navigation to only show the most important ones
  const mobileNavItems = filteredNavItems.filter((item) => item.showOnMobile);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`${collapsed ? "w-12" : "w-64"} hidden sm:block`}></div>
      <div
        className={`fixed top-0 z-30 bottom-0 left-0 h-screen bg-[#0b0b0b] border border-r border-gray-200/10 transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        } hidden  sm:block`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200/10">
          {!collapsed && <Logo />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-800"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <div className="p-2 relative overflow-y-auto overflow-hidden h-[calc(100vh-4rem)]">
          <div className="space-y-2">
            {filteredNavItems.map((nav) => (
              <NavItem
                key={nav.label}
                icon={nav.icon}
                label={collapsed ? "" : nav.label}
                active={activeItem === nav.label}
                onClick={() => handleItemClick(nav.label)}
                href={nav.href}
              />
            ))}
            <div className="border-t  border-gray-200/10  py-3 my-2 w-11/12 absolute bottom-0">
              {session?.user.id && (
                <NavItem
                  key={logoutData.label}
                  icon={logoutData.icon}
                  label={collapsed ? "" : logoutData.label}
                  active={activeItem === logoutData.label}
                  onClick={logoutData.onClick}
                  href={logoutData.href}
                />
              )}
              <div className={`flex border-t-amber-900 items-end justify-start gap-5 ${collapsed? "px-2": "px-4"} py-1 h-9 mt-5 shadow-md max-sm:hidden`}>
                 <Link href="https://www.linkedin.com/in/mrehanamjad/" >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="white"
                    className="w-7 h-7"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </Link>
                <Link href="https://github.com/mrehanamjad" >
                  <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 496 512"
                  fill="white"
                    className="w-7 h-7"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 rounded-lg left-0 right-0 z-50 bg-black/40 border-t border-white/25 flex items-center justify-between px-1 py-0 shadow-md">
        {mobileNavItems.map((nav) => (
          <MobileNavItem
            key={nav.label}
            icon={nav.mobileIcon || nav.icon}
            label={nav.label}
            active={activeItem === nav.label}
            onClick={() => handleItemClick(nav.label)}
            href={nav.href}
          />
        ))}
      </div>

      {/* Mobile Top Space when header is visible */}
      <div className="h-12 sm:hidden"></div>
    </>
  );
}
