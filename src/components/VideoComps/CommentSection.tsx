import React, { useState } from "react";
import {
  X,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  MoreVertical,
} from "lucide-react";
import mongoose from "mongoose";
import { CommentI } from "@/lib/api-client";
import CommentForm from "./CommentForm";
import ScreenLoader from "../ScreenLoader";
import ProfilePic from "../UserComps/ProfilePic";
import Link from "next/link";


const CommentSection = ({
  userId,
  videoId,
  showComments,
  setShowComments,
  comments,
  loading
}: {
  userId: string | mongoose.Types.ObjectId;
  videoId: string | mongoose.Types.ObjectId;
  showComments: boolean;
  setShowComments: (arg: boolean) => void;
  comments:CommentI[];
  loading:boolean;
}) => {
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set()
  );



  const formatTimeAgo = (input: Date | string) => {
  const date = new Date(input); // Ensure it's a Date object
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
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  if(loading) return <ScreenLoader />

  if (!showComments) return null;

  return (
    <div onClick={(e) => e.stopPropagation()} className="absolute inset-0 z-30 bg-black/40 transition-all duration-300">
      <div className="absolute bottom-0 left-0 right-0 bg-[#111111] rounded-t-3xl h-2/3 transition-transform shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b rounded-t-2xl border-gray-700 bg-[#1a1a1a]">
          <div className="flex items-center space-x-3">
            <MessageCircle size={24} className="text-blue-400" />
            <h3 className="text-white font-bold text-xl">Comments</h3>
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">
              {comments.length}
            </span>
          </div>
          <button
            onClick={() => setShowComments(false)}
            className="text-gray-300 hover:bg-red-900 rounded-full p-2  transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Comments List */}
        <div className="overflow-y-auto h-[calc(100%-10rem)] px-6 pt-4 pb-12  space-y-6 ">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="space-y-4 ">
                {/* Main Comment */}
                <div className="flex items-start space-x-4">
                  <Link href={`/${comment.user.userName}`} >
                    <ProfilePic url={'comment.user.profilePic'} name={comment.user.userName || "Undefined"} />
                    </Link>
                  <div className="flex-1 ">
                    <div className="flex items-center space-x-2">
                      <Link href={`/${comment.user.userName}`} className="hover:underline" >
                      <span className="text-white font-semibold text-sm">
                        {comment.user.userName}
                      </span></Link>
                      <span className="text-gray-400 text-xs">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {comment.content}
                    </p>
                    <div className="flex items-center space-x-6 mt-3">
                      <button
                        onClick={() =>
                          setActiveReply(
                            activeReply === comment._id ? null : comment._id
                          )
                        }
                        className="text-gray-400 hover:text-blue-400 text-xs transition-colors"
                      >
                        Reply
                      </button>
                      {comment.replies.length > 0 && (
                        <button
                          onClick={() => toggleExpanded(comment._id)}
                          className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 text-xs transition-colors"
                        >
                          {expandedComments.has(comment._id) ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                          <span>{comment.replies.length} replies</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>

                {/* Reply Input */}
                {activeReply === comment._id && (
                  <div className="ml-14 space-y-3">
                    
                    <CommentForm parentCommentId={comment._id!} userId={userId} videoId={videoId} />
                  </div>
                )}

                {/* Replies */}
                {expandedComments.has(comment._id) &&
                  comment.replies.length > 0 && (
                    <div className="ml-14  space-y-4 border-l-2 border-gray-700 pl-6">
                      {comment.replies.map((reply) => (
                        <div
                          key={reply._id}
                          className="flex items-start space-x-3"
                        >
                          <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-gray-600 ring-opacity-30">
                            <img
                              src={
                                reply.user.profilePic ||
                                "/api/placeholder/32/32"
                              }
                              alt={reply.user.userName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium text-sm">
                                {reply.user.userName}
                              </span>
                              <span className="text-gray-400 text-xs">
                                {formatTimeAgo(reply.createdAt)}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <MessageCircle size={48} className="text-gray-600" />
              <div className="text-center">
                <p className="text-gray-300 text-lg font-medium">
                  No comments yet
                </p>
                <p className="text-gray-500 text-sm">
                  Be the first to share your thoughts!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#1a1a1a] border-t border-gray-700 rounded-b-xl">
          <CommentForm
            userId={userId}
            videoId={videoId}
            parentCommentId={null}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
