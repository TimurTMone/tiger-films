"use client";

import { useQuery } from "@tanstack/react-query";
import { getFilms } from "@/lib/api";
import Link from "next/link";

export default function FilmsPage() {
  const { data: films, isLoading } = useQuery({
    queryKey: ["films"],
    queryFn: getFilms,
  });

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-amber-500">Tiger Films Admin</h1>
          <div className="flex gap-4">
            <Link href="/" className="text-gray-400 hover:text-amber-400">Dashboard</Link>
            <Link href="/actors" className="text-gray-400 hover:text-amber-400">Actors</Link>
            <Link href="/films" className="text-white hover:text-amber-400 font-medium">Films</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">
          Films {films && <span className="text-gray-500 text-lg">({films.length})</span>}
        </h2>

        {isLoading ? (
          <div className="text-gray-400 text-center py-12">Loading films...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {films?.map((film) => (
              <div key={film.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {film.youtube_video_id && (
                  <img
                    src={`https://img.youtube.com/vi/${film.youtube_video_id}/hqdefault.jpg`}
                    alt={film.title_ru}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{film.title_ru}</h3>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                    {film.release_date && (
                      <span className="bg-gray-800 px-2 py-1 rounded text-gray-400">{film.release_date}</span>
                    )}
                    {film.genre && (
                      <span className="bg-gray-800 px-2 py-1 rounded text-gray-400">{film.genre}</span>
                    )}
                    {film.age_rating && (
                      <span className="bg-amber-900/30 px-2 py-1 rounded text-amber-400">{film.age_rating}</span>
                    )}
                    {film.is_new && (
                      <span className="bg-green-900/30 px-2 py-1 rounded text-green-400">New</span>
                    )}
                  </div>
                  {film.duration && (
                    <div className="text-gray-500 text-xs mt-2">{film.duration} | {film.language}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
