// src/types/comment.ts

export interface Comment {
    id: string;
    author: string;
    text: string;
    createdAt: Date;
    replies: Comment[];
}