import React, { useState } from "react";
import {
  X,
  MessageCircle,
} from "lucide-react";
import mongoose from "mongoose";

import CommentForm from "./CommentForm";

import CommentList from "./CommentList";


const CommentSection = ({
  userId,
  videoId,
  showComments,
  setShowComments,
}: {
  userId: string | mongoose.Types.ObjectId;
  videoId: string | mongoose.Types.ObjectId;
  showComments: boolean;
  setShowComments: (arg: boolean) => void;
}) => {

  const [fetchAgain, setFetchAgain] = useState(false);

  if (!showComments) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute inset-0 z-30 bg-black/40 transition-all duration-300 max-sm:mb-14"
    >
      <div className="absolute bottom-0 left-0 right-0 bg-[#111111] rounded-t-3xl h-2/3 transition-transform shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b rounded-t-2xl border-gray-700 bg-[#1a1a1a]">
          <div className="flex items-center space-x-3">
            <MessageCircle size={24} className="text-blue-400" />
            <h3 className="text-white font-bold text-xl">Comments</h3>
            {/* <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">
              {comments.length}
            </span> */}
          </div>
          <button
            onClick={() => setShowComments(false)}
            className="text-gray-300 hover:bg-red-900 rounded-full p-2  transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Comments List */}
              <CommentList refetchComments={()=>{setFetchAgain(prev => !prev)}} fetchAgain={fetchAgain} setShowComments={setShowComments} showComments={showComments} userId={userId} videoId={videoId}  />

        {/* Comment Input */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#1a1a1a] border-t border-gray-700 rounded-b-xl">
          <CommentForm
            userId={userId}
            videoId={videoId}
            parentCommentId={null}
            refetchComments={()=>{setFetchAgain(prev => !prev)}}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
