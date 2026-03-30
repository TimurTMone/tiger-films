"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getActors, deleteActor, type Actor } from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

function getAge(birthDate: string | null): string {
  if (!birthDate) return "-";
  const d = new Date(birthDate);
  if (isNaN(d.getTime())) return "-";
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return String(age);
}

export default function ActorsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["actors", page, search, gender],
    queryFn: () =>
      getActors({ page, per_page: 25, search: search || undefined, gender: gender || undefined }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteActor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actors"] });
      toast.success("Actor deleted");
    },
  });

  const totalPages = data ? Math.ceil(data.total / 25) : 0;

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-amber-500">Tiger Films Admin</h1>
          <div className="flex gap-4">
            <Link href="/" className="text-gray-400 hover:text-amber-400">Dashboard</Link>
            <Link href="/actors" className="text-white hover:text-amber-400 font-medium">Actors</Link>
            <Link href="/films" className="text-gray-400 hover:text-amber-400">Films</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Actors {data && <span className="text-gray-500 text-lg">({data.total})</span>}
          </h2>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, city, language..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <select
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
            value={gender}
            onChange={(e) => { setGender(e.target.value); setPage(1); }}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {isLoading ? (
          <div className="text-gray-400 text-center py-12">Loading actors...</div>
        ) : (
          <>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800/50 text-gray-400 text-left">
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Gender</th>
                    <th className="px-4 py-3">Age</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.actors.map((actor) => (
                    <tr
                      key={actor.id}
                      className="border-t border-gray-800 hover:bg-gray-800/30 cursor-pointer"
                      onClick={() => setSelectedActor(actor)}
                    >
                      <td className="px-4 py-3 text-gray-500">{actor.id}</td>
                      <td className="px-4 py-3 font-medium">{actor.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs ${actor.gender === "male" ? "bg-blue-900/50 text-blue-300" : "bg-pink-900/50 text-pink-300"}`}>
                          {actor.gender === "male" ? "M" : "F"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{getAge(actor.birth_date)}</td>
                      <td className="px-4 py-3 text-gray-400">{actor.city || "-"}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{actor.appearance_type || "-"}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{actor.phone || "-"}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Delete this actor?")) {
                              deleteMutation.mutate(actor.id);
                            }
                          }}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="text-gray-500 text-sm">
                Page {page} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-gray-800 rounded-lg text-sm disabled:opacity-30 hover:bg-gray-700"
                >
                  Previous
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-gray-800 rounded-lg text-sm disabled:opacity-30 hover:bg-gray-700"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {selectedActor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedActor(null)}>
          <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{selectedActor.name}</h3>
              <button onClick={() => setSelectedActor(null)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <Field label="Gender" value={selectedActor.gender === "male" ? "Male" : "Female"} />
              <Field label="Age" value={getAge(selectedActor.birth_date)} />
              <Field label="Birth Date" value={selectedActor.birth_date} />
              <Field label="City" value={selectedActor.city} />
              <Field label="Height" value={selectedActor.height_cm ? `${selectedActor.height_cm} cm` : null} />
              <Field label="Weight" value={selectedActor.weight_kg ? `${selectedActor.weight_kg} kg` : null} />
              <Field label="Eye Color" value={selectedActor.eye_color} />
              <Field label="Hair Color" value={selectedActor.hair_color} />
              <Field label="Appearance" value={selectedActor.appearance_type} />
              <Field label="Languages" value={selectedActor.languages} />
              <Field label="Phone" value={selectedActor.phone} />
              <Field label="Email" value={selectedActor.email} />
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <LongField label="Education" value={selectedActor.education} />
              <LongField label="Portfolio" value={selectedActor.portfolio} />
              <LongField label="Theater" value={selectedActor.theater} />
              <LongField label="Sports" value={selectedActor.sports} />
              <LongField label="Skills" value={selectedActor.other_skills} />
              <LongField label="Choreography" value={selectedActor.choreography} />
              <LongField label="Instruments" value={selectedActor.musical_instruments} />
              <LongField label="Driving" value={selectedActor.driving_license} />
              <LongField label="Social Links" value={selectedActor.social_links} />
              <LongField label="Showreel" value={selectedActor.video_showreel} />
              <LongField label="Tiger Films" value={selectedActor.previous_tiger_films} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <div className="text-gray-500 text-xs mb-0.5">{label}</div>
      <div className="text-gray-200">{value || "-"}</div>
    </div>
  );
}

function LongField({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-gray-500 text-xs mb-0.5">{label}</div>
      <div className="text-gray-300 bg-gray-800/50 rounded p-2">{value}</div>
    </div>
  );
}
