import React from 'react'
import FollowBtn from './FollowBtn';
import ProfilePic from './ProfilePic';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

function UserCard({_id,userName,ProfilePicUrl, name, bio}: { _id: string; userName: string; ProfilePicUrl: string; name: string; bio?: string }) {

const { data: session } = useSession();
  const userId = session?.user.id;

  return (
    <Link href={`/${userName}`} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200 border cursor-pointer bg-white/5  border-gray-800 border-2 shadow-sm mb-3 max-w-5xl mx-auto w-full ">
   
             <div className="flex items-center space-x-4">
               <ProfilePic name={userName} size="lg" url={ProfilePicUrl} />
               <div className="flex flex-col">
                 <h3 className="text-lg font-semibold text-gray-200">{name}</h3>
                 <p className="text-gray-500 text-sm">@{userName}</p>
                 {bio && (
                   <p className="text-gray-600 mt-1 text-sm max-w-md line-clamp-1">{bio}</p>
                 )}
               </div>
             </div>
             {userId !== _id && <FollowBtn userToFollow={_id} size="sm" radius="xl" />}
         
    </Link>
  )
}

export default UserCard