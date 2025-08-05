import { useState } from "react";
import type { Comment } from "../types/comment";
import CommentItem from "./Comment";

const initialComments: Comment[] = [
  {
    id: "1",
    author: "Alice",
    text: "This is the first comment.",
    createdAt: new Date(),
    replies: [
      {
        id: "2",
        author: "Bob",
        text: "Replying to Alice!",
        createdAt: new Date(),
        replies: [],
      },
    ],
  },
  {
    id: "3",
    author: "Charlie",
    text: "Another top-level comment.",
    createdAt: new Date(),
    replies: [],
  },
];

export default function CommentThread() {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleReply = (reply: Comment, parentId: string) => {
    const addReply = (comments: Comment[]): Comment[] =>
      comments.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [...c.replies, reply],
          };
        } else {
          return {
            ...c,
            replies: addReply(c.replies),
          };
        }
      });

    setComments((prev) => addReply(prev));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">💬 Comment Thread</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
}
