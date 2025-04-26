"use client";
import React from "react";
import { Tabs } from "@mantine/core";
import { Bookmark, Clapperboard, SearchX, SquarePlay, UserX } from "lucide-react";
import VideoFeedSM from "./VideoComps/VideoFeedSM";
import {  SearchResponse } from "@/lib/api-client";
import UserFeed from "./UserComps/UserFeed";
import ScreenLoader from "./ScreenLoader";
import NotFound from "./NotFound";

function SearchTabs({ data,loading }: { data: SearchResponse ; loading: boolean }) {

  const ReelSMData = data.videos.map((video)=> ({
    _id: video._id,
    videoUrl: video.videoUrl,
    videoIdImagekit: video.videoIdImagekit,
    title: video.title,
    userId: video.userId._id,
    userName: video.userId.userName,
    profilePicUrl: video.userId.profilePic.url,
    description: video.description
  }))

  const videoNotFound = {
    icon: <SquarePlay size={50} />,
    message: "No videos found",
    subMessage: "Try searching for something else",
  }

  const userNotFound = {
    icon: <UserX size={50} />,
    message: "No users found",
    subMessage: "Try searching for something else",
  }

  const allNotFound = {
    icon: <SearchX size={50} />,
    message: "No results found",
    subMessage: "Try searching for something else",
  }

  return (
    <Tabs color="cyan" defaultValue="all">
      <Tabs.List justify="center">
        <Tabs.Tab value="all" leftSection={<Clapperboard size={20} />}>
          All
        </Tabs.Tab>
          <Tabs.Tab  value="users" leftSection={<Bookmark size={20} />}>
            Users
          </Tabs.Tab>

        <Tabs.Tab value="reels" leftSection={<Clapperboard size={20} />}>
          Reels
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="all" className="">
      {data.users.length > 0 && <UserFeed users={data.users} notFound={userNotFound} isLoading={loading}  />}
      {data.videos.length > 0 && <VideoFeedSM reelsSM={ReelSMData} isLoading={loading} notFound={videoNotFound} />}
      </Tabs.Panel>

        <Tabs.Panel value="users">
          <UserFeed users={data.users} notFound={userNotFound} isLoading={loading}  />
        </Tabs.Panel>
        <Tabs.Panel value="reels">
        <VideoFeedSM reelsSM={ReelSMData} isLoading={loading} notFound={videoNotFound} />
        </Tabs.Panel>

    </Tabs>
  );
}

export default SearchTabs;

