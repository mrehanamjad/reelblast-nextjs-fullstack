import {  LogOut, Pen } from 'lucide-react';
import React from 'react'
import { NavItem } from '../Navbar';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

function UserSettingsNav() {
   async function handleSignout() {
     try {
       await signOut();
     } catch (error) {
       console.error("Error signing out:", error);
     }
   }
   return (
     <div className="w-48 bg-gray-800 rounded-xl shadow-xl p-3 border border-gray-700">
       <Link
         href="/update-profile"
         className="flex items-center px-3 py-2 rounded-md text-sm text-gray-200 hover:bg-gray-700 transition-colors"
       >
         <Pen size={18} className="mr-2" />
         Edit Profile
       </Link>
       <NavItem
         icon={<LogOut size={18} />}
         label="Logout"
         href=""
         onClick={handleSignout}
       />
     </div>
   );
}

export default UserSettingsNav