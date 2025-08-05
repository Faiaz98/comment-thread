import { useState } from "react";
import type { Comment } from "../types/comment";

interface CommentItemProps {
  comment: Comment;
  onReply: (reply: Comment, parentId: string) => void;
}

export default function CommentItem({ comment, onReply }: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(true);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  // 👇 Lazy loading logic
  const [loadedReplies, setLoadedReplies] = useState<Comment[]>(
    comment.replies.length > 0 ? [comment.replies[0]] : []
  );

  const hasMoreReplies = loadedReplies.length < comment.replies.length;

  const loadMoreReplies = () => {
    setLoadedReplies(comment.replies); // load all remaining
  };

  const handleSubmit = () => {
    if (replyText.trim() === "") return;

    const newReply: Comment = {
      id: crypto.randomUUID(),
      author: "You",
      text: replyText,
      createdAt: new Date(),
      replies: [],
    };

    onReply(newReply, comment.id);
    setReplyText("");
    setReplying(false);
    setShowReplies(true);
  };

  return (
    <div className="pl-4 border-l border-gray-300">
      <div className="bg-white p-3 rounded shadow-sm">
        <div className="text-sm text-gray-600">
          <strong>{comment.author}</strong> ·{" "}
          {comment.createdAt.toLocaleTimeString()}
        </div>
        <p className="text-gray-800 mt-1">{comment.text}</p>

        <div className="text-xs text-blue-500 mt-2 space-x-3">
          <button onClick={() => setReplying((prev) => !prev)}>
            {replying ? "Cancel" : "Reply"}
          </button>

          {comment.replies.length > 0 && (
            <button onClick={() => setShowReplies((prev) => !prev)}>
              {showReplies ? "Hide Replies" : `Show Replies (${comment.replies.length})`}
            </button>
          )}
        </div>

        {replying && (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded text-sm"
              rows={2}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
            />
            <button
              onClick={handleSubmit}
              className="mt-1 text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* 👇 Lazy loaded replies */}
      {showReplies && loadedReplies.length > 0 && (
        <div className="mt-2 space-y-2">
          {loadedReplies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
            />
          ))}

          {hasMoreReplies && (
            <button
              onClick={loadMoreReplies}
              className="text-xs text-blue-500 hover:underline mt-1 ml-2"
            >
              Load more replies ({comment.replies.length - loadedReplies.length})
            </button>
          )}
        </div>
      )}
    </div>
  );
}
