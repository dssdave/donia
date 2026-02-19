import Link from "next/link";
import { routines } from "@/lib/data/routines";

export default function VipRoutinesPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-amber-500 tracking-tight">VIP Routines</h1>
                    <p className="text-slate-500 mt-1">Full list of all training routines available in the system.</p>
                </div>
                <Link
                    href="/vip/routines/new"
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    + Create New Routine
                </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Routine</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Description</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Stats</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {routines.map((routine) => (
                            <tr key={routine.id} className="group hover:bg-amber-50/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-md ${routine.color} flex items-center justify-center text-white text-xs font-bold shadow-inner`}>
                                            {routine.title.charAt(0)}
                                        </div>
                                        <span className="font-bold text-slate-900">{routine.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">
                                    <span className="line-clamp-1">{routine.description}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col text-xs font-medium text-slate-400">
                                        <span>{routine.steps.length} Exercises</span>
                                        <span>{routine.duration}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/vip/routines/${routine.id}`}
                                        className="text-amber-600 font-bold text-sm hover:underline underline-offset-4"
                                    >
                                        Edit Details →
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
