// "use client";
// import React, { useState } from "react";
// import {
//   Home,
//   Search,
//   PlusSquare,
//   Heart,
//   User,
//   LogOut,
//   Menu,
//   X,
//   Clapperboard,
//   Film,
//   Bookmark,
// } from "lucide-react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import ProfilePic from "./UserComps/ProfilePic";
// import { useUserProfile } from "./UserProfileContext";
// import Logo from "./Logo";

// interface NavItemProps {
//   icon: React.ReactNode;
//   label: string;
//   active?: boolean;
//   onClick?: () => void;
//   href: string;
// }

// const NavItem: React.FC<NavItemProps> = ({
//   icon,
//   label,
//   active,
//   onClick,
//   href,
// }) => {
//   return (
//     <Link href={href}>
//       <button
//         onClick={onClick}
//         className={`flex items-center cursor-pointer w-full p-3 rounded-lg transition-colors ${
//           active
//             ? "bg-blue-100 text-blue-600 dark:text-blue-300 dark:bg-gray-900"
//             : "text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900  dark:text-gray-100"
//         }`}
//       >
//         <div className="flex items-center">
//           <div className="mr-3">{icon}</div>
//           <span className="font-medium">{label}</span>
//         </div>
//       </button>
//     </Link>
//   );
// };

// export default function SideNavbar() {
//   const [activeItem, setActiveItem] = useState("Home");
//   const [collapsed, setCollapsed] = useState(false);
//   const {user} = useUserProfile()

//   const handleItemClick = (label: string) => {
//     setActiveItem(label);
//   };

//   const {data:session} = useSession()

//   const navItemsData: {
//     icon: React.JSX.Element;
//     label: string;
//     href: string;
//   }[] = [
//     {
//       icon: <Home size={20} />,
//       label: "Home",
//       href: "/",
//     },
//     {
//       icon: <Search size={20} />,
//       label: "Discover People",
//       href: "/search",
//     },
//     {
//       icon: <Clapperboard size={20} />,
//       label: "Following",
//       href: "/followings",
//     },
//     {
//       icon: <Film size={20} />,
//       label: "Reels",
//       href: "/reels",
//     },
//     {
//       icon: <PlusSquare size={20} />,
//       label: "Create",
//       href: "/upload",
//     },
//     {
//       icon: <Heart size={20} />,
//       label: "Notifications",
//       href: "/notifications",
//     },
//     {
//       icon: <Bookmark size={20} />,
//       label: "Saved",
//       href: "/saved",
//     },
//     {
//       icon: <ProfilePic size="sm" name={user?.name!} url={user?.profilePic.!}  />,
//       label: session?.user.username || "Profile",
//       href: `/${session?.user.username}`,
//     },
//   ];

//   return (
//     <>
//     <div className={`${collapsed ? "w-12" : "w-64"} max-sm:hidden`}></div>
//     <div
//       className={`fixed top-0 z-50 bottom-0 left-0 h-screen bg-white dark:bg-black/95   border-gray-200 transition-all duration-300 ${
//         collapsed ? "w-16" : "w-64"
//       } max-sm:hidden`}
//     >
//       <div className="p-4 flex items-center justify-between border-b border-gray-200">
//         {!collapsed && (
//         //   <h1 className="text-xl font-bold text-blue-600">ReelSocial</h1>
//         <Logo />
//         )}
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="p-1 rounded-lg hover:bg-gray-100"
//         >
//           {collapsed ? <Menu size={20} /> : <X size={20} />}
//         </button>
//       </div>

//       <div className="p-2">
//         <div className="space-y-2">
//             {navItemsData.map((nav) => (
//           <NavItem
//           key={nav.label}
//             icon={nav.icon}
//             label={collapsed ? "" : nav.label}
//             active={activeItem === nav.label}
//             onClick={() => handleItemClick(nav.label)}
//             href={nav.href}
//           />
//         ))}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }


"use client";
import React, { useState } from "react";
import {
  Home,
  Search,
  PlusSquare,
  Heart,
  Menu,
  X,
  Clapperboard,
  Film,
  Bookmark,
  Bell,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfilePic from "./UserComps/ProfilePic";
import { useUserProfile } from "./UserProfileContext";
import Logo from "./Logo";
import { signOut } from 'next-auth/react';

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
            ? "bg-blue-100 text-blue-600 dark:text-blue-300 dark:bg-gray-900"
            : "text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-100"
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
          active
            ? "text-blue-600 dark:text-blue-300"
            : "text-gray-700 dark:text-gray-100"
        }`}
      >
        <div>{icon}</div>
        <span className="text-xs mt-1 font-medium">{label}</span>
      </button>
    </Link>
  );
};

export default function SideNavbar() {
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
      mobileIcon: <Home size={24} />,
      label: "Home",
      href: "/",
      showOnMobile: true,
      isLogedIn: true,
    },
    {
      icon: <Search size={20} />,
      mobileIcon: <Search size={24} />,
      label: "Search",
      href: "/search",
      showOnMobile: true,
      isLogedIn: true,
    },
    {
      icon: <Clapperboard size={20} />,
      mobileIcon: <Clapperboard size={24} />,
      label: "Followings",
      href: "/followings",
      showOnMobile: false,
      isLogedIn: true,
    },
    {
      icon: <Film size={20} />,
      mobileIcon: <Film size={24} />,
      label: "Reels",
      href: "/",
      showOnMobile: false,
      isLogedIn: true,
    },
    {
      icon: <PlusSquare size={24} />,
      mobileIcon: <PlusSquare size={24} />,
      label: "Create",
      href: "/video/upload",
      showOnMobile: true,
      isLogedIn: true,
    },
    {
      icon: (
        <ProfilePic
          size="sm"
          name={user?.name!}
          url={user?.profilePic.url!}
        />
      ),
      mobileIcon: (
        <ProfilePic
          size="sm"
          name={user?.name!}
          url={user?.profilePic.url!}
        />
      ),
      label: "Profile",
      href: `/${session?.user.username}`,
      showOnMobile: true,
      isLogedIn: true,
    },
    {
      icon: <LogIn size={20} />,
      mobileIcon: <LogIn size={24} />,
      label: "Login",
      href: "/login",
      showOnMobile: true,
      isLogedIn: false,
    },
    {
      icon: <UserPlus size={20} />,
      mobileIcon: <UserPlus size={24} />,
      label: "Sign Up",
      href: "/register",
      showOnMobile: true,
      isLogedIn: false,
    }
  ];

  // Filter items based on login status
  const filteredNavItems = navItemsData.filter((item) => {
    if (item.label === "Home") {
      return true;
    }
    if (session?.user.id) {
      return item.isLogedIn === true;
    }
    return item.isLogedIn === false;
  });

  const logoutData =  {
    icon: <LogOut size={20}/>,
    mobileIcon: <LogOut />,
    label: "Logout",
    href: "",
    showOnMobile: true,
    onClick: handleSignout,
  }

  // Filter items for mobile navigation to only show the most important ones
  const mobileNavItems = filteredNavItems.filter(item => item.showOnMobile);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`${collapsed ? "w-12" : "w-64"} hidden sm:block`}></div>
      <div
        className={`fixed top-0 z-50 bottom-0 left-0 h-screen bg-white dark:bg-black/95 border-r border-gray-200 transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        } hidden sm:block`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          {!collapsed && <Logo />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <div className="p-2 relative overflow-y-auto h-[calc(100vh-4rem)]">
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
            {session?.user.id && <div className="border-t border-gray-200 py-3 my-2 w-11/12 absolute bottom-0">
            <NavItem
              key={logoutData.label}
              icon={logoutData.icon}
              label={collapsed ? "" : logoutData.label}
              active={activeItem === logoutData.label}
              onClick={logoutData.onClick}
              href={logoutData.href}
            />
            </div>}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-black border-t border-gray-200 flex items-center justify-between px-1 py-1 shadow-md">
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
      
      {/* Mobile Bottom Space */}
      <div className="h-16 sm:hidden"></div>

      {/* Mobile Top Space when header is visible */}
      <div className="h-12 sm:hidden"></div>
    </>
  );
}