"use client";

import { useState } from "react";
import type { Comment } from "@/lib/data";

export default function CommentForm({
  newsSlug,
  onAdd,
}: {
  newsSlug: string;
  onAdd: (author: string, text: string) => void;
}) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    onAdd(author.trim(), text.trim());
    setAuthor("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input type="hidden" name="newsSlug" value={newsSlug} />
      <div>
        <label htmlFor="comment-author" className="block text-sm font-medium text-zinc-300">Ваше имя *</label>
        <input
          id="comment-author"
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
        />
      </div>
      <div>
        <label htmlFor="comment-text" className="block text-sm font-medium text-zinc-300">Комментарий *</label>
        <textarea
          id="comment-text"
          rows={4}
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-white focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
        />
      </div>
      <button type="submit" className="btn-primary">
        Отправить комментарий
      </button>
    </form>
  );
}

export function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) return <p className="text-zinc-500">Пока нет комментариев. Оставьте первый!</p>;
  return (
    <div className="divide-y divide-[var(--border)]">
      {comments.map((c) => (
        <div key={c.id} className="border-b border-[var(--border)] py-4 last:border-0">
          <p className="font-medium text-white">{c.author}</p>
          <time className="text-sm text-zinc-500">
            {new Date(c.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
          </time>
          <p className="mt-2 text-zinc-300">{c.text}</p>
        </div>
      ))}
    </div>
  );
}
