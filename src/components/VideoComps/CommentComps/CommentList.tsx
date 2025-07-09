"use client";
import ProfilePic from "@/components/UserComps/ProfilePic";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CommentMenu from "./CommentMenu";
import CommentForm from "./CommentForm";
import mongoose from "mongoose";
import { apiClient, CommentI } from "@/lib/api-client";
import ScreenLoader from "@/components/ScreenLoader";
import { notifications } from "@mantine/notifications";

const ShowComment = ({
  userId,
  videoId,
  comment,
  comments,
  activeReply,
  setActiveReply,
  getComments,
  refetchComments
}: {
  userId: string | mongoose.Types.ObjectId;
  videoId: string | mongoose.Types.ObjectId;
  comment: CommentI;
  comments: CommentI[];
  activeReply: string | null;
  setActiveReply: (org: string | null) => void;
  getComments: (videoId: string) => Promise<void>;
  refetchComments:()=>void
}) => {
  const nestedComments = comments.filter(
    (child) => child.parentCommentId === comment._id
  );

  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set()
  );

  const formatTimeAgo = (input: Date | string) => {
    const date = new Date(input);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  };

  const toggleExpanded = (commentId: string) => {
    console.log(comment);
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  return (
    <div className="space-y-4">
      {/* Main Comment */}
      <div className="group">
        <div className="flex items-start gap-3">
          {/* Profile Picture */}
          <Link href={`/${comment.user.userName}`} className="flex-shrink-0">
            <ProfilePic
              url={comment.user.profilePic?.url}
              name={comment.user.userName || "Undefined"}
            />
          </Link>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            {/* User Info & Timestamp */}
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/${comment.user.userName}`}
                className="text-white font-semibold text-sm hover:underline transition-colors"
              >
                {comment.user.userName}
              </Link>
              <span className="text-gray-400 text-xs">
                {formatTimeAgo(comment.createdAt)}
              </span>
            </div>

            {/* Comment Text */}
            <p className="text-gray-200 text-sm leading-relaxed mb-3">
              {comment.content}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setActiveReply(
                    activeReply === comment._id ? null : comment._id
                  )
                }
                className="text-gray-400 hover:text-blue-400 text-xs font-medium transition-colors"
              >
                Reply
              </button>

              {nestedComments.length > 0 && (
                <button
                  onClick={() => toggleExpanded(comment._id)}
                  className="flex items-center gap-1 text-gray-400 hover:text-blue-400 text-xs font-medium transition-colors"
                >
                  {expandedComments.has(comment._id) ? (
                    <ChevronUp size={12} />
                  ) : (
                    <ChevronDown size={12} />
                  )}
                  <span>
                    {nestedComments.length}{" "}
                    {nestedComments.length === 1 ? "reply" : "replies"}
                  </span>
                </button>
              )}
            </div>
          </div>

          {userId === comment.user._id && (
            <CommentMenu
              commentId={comment._id}
              videoId={videoId as string}
              fetchAgain={getComments}
            />
          )}
        </div>

        {/* Reply Input */}
        {activeReply === comment._id && (
          <div className="mt-4 ml-12">
            <CommentForm
              parentCommentId={comment._id}
              userId={userId}
              videoId={videoId}
              setActiveReply={setActiveReply}
              refetchComments={refetchComments}
            />
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {nestedComments.length > 0 && expandedComments.has(comment._id) && (
        <div className="ml-6 border-gray-700 pl-4 space-y-4">
          {nestedComments.map((nestedComment) => (
            <ShowComment
              key={nestedComment._id}
              comment={nestedComment}
              comments={comments}
              userId={userId}
              videoId={videoId}
              activeReply={activeReply}
              setActiveReply={setActiveReply}
              getComments={getComments}
              refetchComments={refetchComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function CommentList({
  userId,
  videoId, 
  showComments,
  setShowComments,
  fetchAgain,
  refetchComments
}: {
  userId: string | mongoose.Types.ObjectId;
  videoId: string | mongoose.Types.ObjectId;
  showComments: boolean;
  setShowComments: (arg: boolean) => void;
  fetchAgain: boolean;
  refetchComments: () => void
}) {
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentI[]>([]);
  const [loading, setLoading] = useState(false);

        const getComments = async (videoId: string) => {
      try {
        setLoading(true);
        const res = await apiClient.getComments(videoId);
        setComments(res);
      } catch (error: unknown) {
        let errorMessage = "Failed to fetch comment";

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        console.error("Failed to fetch comment:", error);
        notifications.show({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if(!ShowComment) return;
    getComments(videoId as string);
  }, [ShowComment, setShowComments,fetchAgain,refetchComments]);

  if (loading) return <ScreenLoader />;

  return (
    <div className="overflow-y-auto h-[calc(100%-10rem)] px-6 pt-4 pb-12  space-y-6 ">
      {comments.length > 0 ? (
        comments.map((comment) => {
          if (comment.parentCommentId === null)
            return (
              <ShowComment
                key={comment._id}
                userId={userId}
                videoId={videoId}
                comment={comment}
                comments={comments}
                activeReply={activeReply}
                setActiveReply={setActiveReply}
                getComments={getComments}
                refetchComments={refetchComments}
              />
            );
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <MessageCircle size={48} className="text-gray-600" />
          <div className="text-center">
            <p className="text-gray-300 text-lg font-medium">No comments yet</p>
            <p className="text-gray-500 text-sm">
              Be the first to share your thoughts!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentList;
