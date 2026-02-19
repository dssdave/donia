"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { routines, EXERCISE_BANK, RoutineStep, Routine } from "@/lib/data/routines";
import Link from "next/link";

export default function RoutineEditorPage() {
    const params = useParams();
    const router = useRouter();
    const routineId = params.id as string;

    const initialRoutine = routines.find(r => r.id === routineId);
    const [routine, setRoutine] = useState<Routine | undefined>(initialRoutine);
    const [isSaving, setIsSaving] = useState(false);

    if (!routine) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-900">Routine not found</h2>
                <Link href="/vip" className="text-amber-600 hover:underline mt-4 inline-block font-bold">
                    Return to VIP Dashboard
                </Link>
            </div>
        );
    }

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const newSteps = [...routine.steps];
        const temp = newSteps[index];
        newSteps[index] = newSteps[index - 1];
        newSteps[index - 1] = temp;
        setRoutine({ ...routine, steps: newSteps });
    };

    const handleMoveDown = (index: number) => {
        if (index === routine.steps.length - 1) return;
        const newSteps = [...routine.steps];
        const temp = newSteps[index];
        newSteps[index] = newSteps[index + 1];
        newSteps[index + 1] = temp;
        setRoutine({ ...routine, steps: newSteps });
    };

    const handleRemove = (index: number) => {
        const newSteps = routine.steps.filter((_, i) => i !== index);
        setRoutine({ ...routine, steps: newSteps });
    };

    const handleAddFromBank = (exercise: RoutineStep) => {
        setRoutine({
            ...routine,
            steps: [...routine.steps, { ...exercise, id: `${exercise.id}-${Date.now()}` }]
        });
    };

    const handleSave = () => {
        setIsSaving(true);
        // In a real app, this would hit an API
        setTimeout(() => {
            setIsSaving(false);
            alert("Routine saved successfully!");
            router.push("/vip");
        }, 800);
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 leading-none">Editing: {routine.title}</h1>
                    <p className="text-slate-500 mt-2">Reorder exercises or add new ones from the bank below.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/vip"
                        className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold shadow-sm transition-all disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Routine Steps */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        Selected Exercises
                        <span className="text-xs font-normal bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                            {routine.steps.length}
                        </span>
                    </h2>

                    <div className="space-y-3">
                        {routine.steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 group hover:border-amber-200 hover:shadow-sm transition-all"
                            >
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => handleMoveUp(index)}
                                        disabled={index === 0}
                                        className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-amber-600 disabled:opacity-20"
                                    >
                                        ▲
                                    </button>
                                    <button
                                        onClick={() => handleMoveDown(index)}
                                        disabled={index === routine.steps.length - 1}
                                        className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-amber-600 disabled:opacity-20"
                                    >
                                        ▼
                                    </button>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-900">{step.title}</h4>
                                    <p className="text-sm text-slate-500 line-clamp-1">{step.instruction}</p>
                                </div>

                                <div className="text-sm font-medium text-slate-400 px-2 whitespace-nowrap">
                                    {step.duration}s
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/vip/routines/${routine.id}/generate/${step.id}`}
                                        className="text-xs bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full font-bold hover:bg-amber-100 transition-colors"
                                    >
                                        🎥 Generate Video
                                    </Link>
                                    <button
                                        onClick={() => handleRemove(index)}
                                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}

                        {routine.steps.length === 0 && (
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-medium">
                                No exercises added yet. Pick some from the bank on the right!
                            </div>
                        )}
                    </div>
                </div>

                {/* Exercise Bank */}
                <div className="bg-slate-100 rounded-2xl p-6 h-fit sticky top-24 border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Exercise Bank</h2>
                    <div className="space-y-3">
                        {EXERCISE_BANK.map((exercise) => (
                            <div
                                key={exercise.id}
                                className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{exercise.title}</h4>
                                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">{exercise.duration}s</span>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{exercise.instruction}</p>
                                <button
                                    onClick={() => handleAddFromBank(exercise)}
                                    className="w-full py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-amber-600 active:scale-95 transition-all outline-amber-500"
                                >
                                    Add to Routine +
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
