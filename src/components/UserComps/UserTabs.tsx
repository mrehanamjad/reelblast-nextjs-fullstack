"use client"
import React from 'react'
import { Tabs } from '@mantine/core';
import { Bookmark, Clapperboard, Settings, Video } from 'lucide-react';
import VideoFeedSM from '../VideoComps/VideoFeedSM';
import { useSession } from 'next-auth/react';



function UserTabs({username}:{username?:string}) {
  const {data:session} = useSession();
  return (
    <Tabs color="cyan" defaultValue="reels">
      <Tabs.List justify="center">
        <Tabs.Tab value="reels" leftSection={<Clapperboard size={20} />}>
          Reels
        </Tabs.Tab>
        {session?.user.username === username && <Tabs.Tab value="saved" leftSection={<Bookmark size={20} />}>
          Saved
        </Tabs.Tab>}
      </Tabs.List>

      <Tabs.Panel value="reels" className=''>
        <VideoFeedSM apiName='user' username={username} />
      </Tabs.Panel>

      {session?.user.username === username && <Tabs.Panel value="saved">
        <VideoFeedSM apiName='save' />
      </Tabs.Panel>}

    </Tabs>
  )
}

export default UserTabs