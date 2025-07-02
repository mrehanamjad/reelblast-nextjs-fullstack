"use client";
import { ActionIcon } from "@mantine/core";
import { Share2Icon } from "lucide-react";
import React, { useState } from "react";
import ShareCard from "./ShareCard";

function ShareVideo({ReelsId}: {ReelsId: string}) {
  const [shareCardOpen, SetShareCardOpen] = useState(false);
  const handleShareIconClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    SetShareCardOpen(!shareCardOpen);
  };

  const handleCloss = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    SetShareCardOpen(false);
  };

  const shareUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/video/${ReelsId}`;

  return (
    <div className="flex flex-col items-center">
      <ActionIcon
        size={42}
        variant="default"
        radius={"xl"}
        aria-label="ActionIcon with size as a number"
        onClick={handleShareIconClick}
      >
        <Share2Icon size={24} />
      </ActionIcon>
      <ShareCard
        shareUrl={shareUrl}
        onClickCross={handleCloss}
        showShareCard={shareCardOpen}
      />
      <span className="text-white text-xs ">Share</span>
    </div>
  );
}

export default ShareVideo;
