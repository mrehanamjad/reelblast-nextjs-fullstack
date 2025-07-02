"use client";
import React, { useRef, useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { CopyIcon, X, Share2 } from "lucide-react";
import { Button, Input } from "@mantine/core";

interface ShareCardProps {
  shareUrl: string;
  shareIconSize?: number;
  onClickCross: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  showShareCard: boolean;
}

const ShareCard: React.FC<ShareCardProps> = ({
  shareUrl,
  shareIconSize = 50,
  onClickCross,
  className = "",
  showShareCard,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copyBtnText, setCopyBtnText] = useState("Copy");

  const clickCopy = (e:React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const inp = inputRef.current;
    if (inp) {
      navigator.clipboard
        .writeText(inp.value)
        .then(() => {
          inp.select();
          setCopyBtnText("Copied!");
          setTimeout(() => {
            setCopyBtnText("Copy");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error copying text: ", error);
        });
    }
  };

  const socialPlatforms = [
    { Component: WhatsappShareButton, Icon: WhatsappIcon },
    { Component: FacebookShareButton, Icon: FacebookIcon },
    { Component: TwitterShareButton, Icon: TwitterIcon },
    { Component: LinkedinShareButton, Icon: LinkedinIcon },
    { Component: TelegramShareButton, Icon: TelegramIcon },
    { Component: EmailShareButton, Icon: EmailIcon },
    { Component: TumblrShareButton, Icon: TumblrIcon },
    { Component: RedditShareButton, Icon: RedditIcon },
  ];

  return (
    <div
    onClick={(e) => e.stopPropagation()}
  className={`${
    showShareCard ? "flex" : "hidden"
  } fixed inset-0 bg-black/80 items-center justify-center z-50 p-4 ${className}`}
>
  <div className="bg-[#111] text-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-800">
    {/* Close Button */}
    <div className="flex justify-end p-4 bg-[#1a1a1a]">
      <button
        onClick={onClickCross}
        className="text-gray-300 hover:bg-red-900 rounded-lg p-2 transition-colors"
      >
        <X className="text-white" />
      </button>
    </div>

    {/* Content */}
    <div className="px-6 pb-6 pt-2 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <Share2 className="text-blue-400 text-2xl" />
        <h2 className="text-xl font-semibold text-white">Share to Social Media</h2>
      </div>

      {/* Social Media Icons */}
       <div className="flex flex-wrap justify-center items-center gap-4">
        {socialPlatforms.map(({ Component, Icon }, index) => (
          <Component
            key={index}
            url={shareUrl}
            className="hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <Icon size={shareIconSize} className="rounded-lg" />
          </Component>
        ))}
      </div>

      {/* Copy Link Section */}
      <div className="mt-4">
        <div className="flex items-center bg-[#2e2e2e] rounded-lg border border-gray-700">
          <Input
            name="shareUrlInp"
            value={shareUrl}
            ref={inputRef}
            readOnly
            className="flex-grow px-3 py-2   w-full"
          />
          <Button
            variant="filled"
            onClick={clickCopy}
            radius="sm"
            className="flex items-center gap-2 m-1 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <CopyIcon size={35} className="mr-1" />{copyBtnText}
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ShareCard;
