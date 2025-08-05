# Recursive Comment Thread UI

A minimal Reddit/YouTube-style nested comment system built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**.

## ✨ Features

-  Recursive rendering of comments
-  Expand/collapse nested replies
-  Controlled inputs and local state per comment
-  Lifted state management (comment tree)
-  Event handling for reply and toggle actions
-  Responsive and minimal Tailwind styling

## What You'll learn

- Deep recursion in React components
- Combining local + lifted state effectively
- Avoiding unnecessary re-renders
- Controlled form inputs (in nested components)
- Functional updates to complex nested data
- Tailwind for clean layout & spacing 

## Tech Stack

- React + TS
- Vite
- TailwindCSS

## Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/Faiaz98/comment-thread.git
cd comment-thread
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the dev server**

```bash
npm run dev
```

4. Open your local host to see the app.


## Project Structure
```
src/
│
├── components/
│   ├── CommentThread.tsx   // main state + renderer
│   └── Comment.tsx         // recursive component
│
├── types/
│   └── comment.ts          // Comment type definition
│
├── App.tsx
└── main.tsx
```

## Future Enhancements

- Persist comments to localstorage
- Emoji reactions per comment
- Lazy load deep nested replies
- Add new top-level comment form
- Dark mode

