"use client"

import UserProfileInfo from '@/components/UserComps/UserProfileInfo';
import { use } from "react";
import UserTabs from '@/components/UserComps/UserTabs';

export default function UserProfile({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params);
  
  return (
    <div className="relative flex flex-col min-h-screen bg-black/90">
      <main className="flex-grow container mx-auto sm:px-4 py-10 sm:py-6">
        <UserProfileInfo username={id} />
          <UserTabs username={id} />
      </main>
    </div>
  );
}
