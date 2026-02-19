import Link from "next/link";
import { routines } from "@/lib/data/routines";

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-amber-500 tracking-tight">VIP Content Builder</h1>
                    <p className="text-slate-500 mt-1">Manage routines, exercises, and generate character-consistent videos.</p>
                </div>
                <Link
                    href="/vip/routines/new"
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    Create New Routine
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routines.map((routine) => (
                    <Link
                        key={routine.id}
                        href={`/vip/routines/${routine.id}`}
                        className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-amber-200 transition-all"
                    >
                        <div className={`w-12 h-12 rounded-lg ${routine.color} mb-4 flex items-center justify-center text-white text-xl shadow-inner`}>
                            {routine.title.charAt(0)}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors uppercase tracking-wide">{routine.title}</h3>
                        <p className="text-sm text-slate-500 mt-2 line-clamp-2">{routine.description}</p>
                        <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            <span>{routine.steps.length} Exercises</span>
                            <span>{routine.duration}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
