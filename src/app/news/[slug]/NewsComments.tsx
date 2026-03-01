"use client";

import { useState } from "react";
import type { Comment } from "@/lib/data";
import { CommentList } from "@/components/CommentForm";
import CommentForm from "@/components/CommentForm";

export default function NewsComments({
  newsSlug,
  initialComments,
}: {
  newsSlug: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleAdd = (author: string, text: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      newsId: newsSlug,
      author,
      text,
      date: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <>
      <CommentList comments={comments} />
      <h3 className="mt-8 text-lg font-semibold text-white">Оставить комментарий</h3>
      <CommentForm newsSlug={newsSlug} onAdd={handleAdd} />
    </>
  );
}
