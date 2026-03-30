"use client";

import { useQuery } from "@tanstack/react-query";
import { getStats } from "@/lib/api";
import Link from "next/link";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-amber-500">Tiger Films Admin</h1>
          <div className="flex gap-4">
            <Link href="/" className="text-white hover:text-amber-400 font-medium">Dashboard</Link>
            <Link href="/actors" className="text-gray-400 hover:text-amber-400">Actors</Link>
            <Link href="/films" className="text-gray-400 hover:text-amber-400">Films</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {isLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-amber-500">{stats.total_actors}</div>
                <div className="text-gray-400 mt-1">Actors in Database</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-teal-500">{stats.total_films}</div>
                <div className="text-gray-400 mt-1">Films</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-orange-500">{stats.total_news}</div>
                <div className="text-gray-400 mt-1">News Articles</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">By Gender</h3>
                <div className="space-y-3">
                  {Object.entries(stats.actors_by_gender).map(([gender, count]) => (
                    <div key={gender} className="flex items-center justify-between">
                      <span className="text-gray-300">{gender === "male" ? "Male" : "Female"}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${(count / stats.total_actors) * 100}%` }}
                          />
                        </div>
                        <span className="text-gray-400 w-10 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Top Cities</h3>
                <div className="space-y-2">
                  {Object.entries(stats.actors_by_city).slice(0, 8).map(([city, count]) => (
                    <div key={city} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{city}</span>
                      <span className="text-amber-400 font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Appearance Types</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(stats.actors_by_appearance).map(([type, count]) => (
                    <div key={type} className="bg-gray-800 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-amber-400">{count}</div>
                      <div className="text-gray-400 text-xs mt-1">{type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
