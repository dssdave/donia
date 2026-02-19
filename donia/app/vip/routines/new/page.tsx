"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewRoutinePage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;

        // In a real app, this would hit an API and return a new ID
        const newId = title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

        // Simulate successful creation
        alert(`Routine "${title}" created! Redirecting to editor...`);
        router.push(`/vip/routines/${newId}`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-amber-500 tracking-tight">Create New VIP Routine</h1>
                <p className="text-slate-500 mt-2">Enter the basic details to start building your content.</p>
            </div>

            <form onSubmit={handleCreate} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Routine Title</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Afternoon Energy Boost"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What is this routine focused on?"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-medium resize-none"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Link
                        href="/vip"
                        className="flex-1 py-3 text-center border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="flex-[2] py-3 bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-100 hover:bg-amber-600 active:scale-[0.98] transition-all"
                    >
                        Start Building ✨
                    </button>
                </div>
            </form>
        </div>
    );
}
