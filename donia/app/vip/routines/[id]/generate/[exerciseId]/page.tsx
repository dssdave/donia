"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { routines, EXERCISE_BANK, RoutineStep } from "@/lib/data/routines";
import { CHARACTERS } from "@/context/CharacterContext";
import Link from "next/link";

export default function VideoGeneratorPage() {
    const params = useParams();
    const router = useRouter();
    const { id: routineId, exerciseId } = params;

    const routine = routines.find(r => r.id === routineId);
    const exercise = routine?.steps.find(s => s.id === exerciseId) || EXERCISE_BANK.find(e => e.id === exerciseId);

    const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [log, setLog] = useState<string[]>([]);

    if (!exercise) {
        return <div className="p-10 text-center">Exercise not found.</div>;
    }

    const generatePrompt = () => {
        return `3D animation, Zootopia-inspired style. A character named ${selectedCharacter.name} who is a ${selectedCharacter.id} with the following traits: ${selectedCharacter.description}. 
The scene is set in a vibrant, sunny playroom with soft colorful mats. 
${selectedCharacter.name} is performing the exercise: "${exercise.title}". 
Action: ${exercise.instruction}. 
Cinematography: Full shot, bright studio lighting, smooth 60fps animation, consistent character design, vibrant colors, kid-friendly environment.`;
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setLog([`Initializing Veo3 generation for ${selectedCharacter.name}...`]);

        // Simulate API calls
        setTimeout(() => {
            const prompt = generatePrompt();
            setLog(prev => [...prev, `Sending prompt to Veo3:`, prompt]);

            setTimeout(() => {
                setLog(prev => [...prev, `Veo3: Processing video frames...`, `Veo3: Applying style consistency weights...`]);

                setTimeout(() => {
                    setLog(prev => [...prev, `Video generated successfully!`]);
                    setGeneratedVideoUrl("https://storage.googleapis.com/veo3-assets/demo-video.mp4"); // Mock URL
                    setIsGenerating(false);
                }, 2000);
            }, 1500);
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Link href={`/vip/routines/${routineId}`} className="p-2 hover:bg-amber-50 rounded-full transition-colors text-amber-500 font-bold">
                    ←
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-amber-500 tracking-tight underline decoration-amber-200 underline-offset-8">VIP Video Generator</h1>
                    <p className="text-slate-500">Create a character-consistent video for <strong>{exercise.title}</strong></p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Step 1: Character Selection */}
                <div className="space-y-6">
                    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">1. Select Character</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {CHARACTERS.map((char) => (
                                <button
                                    key={char.id}
                                    onClick={() => setSelectedCharacter(char)}
                                    className={`p-4 rounded-xl border-2 transition-all text-center ${selectedCharacter.id === char.id
                                        ? "border-amber-500 bg-amber-50 shadow-inner"
                                        : "border-slate-100 bg-white hover:border-amber-200"
                                        }`}
                                >
                                    <div className="text-4xl mb-2">{char.avatar}</div>
                                    <div className="font-bold text-slate-900">{char.name}</div>
                                    <div className="text-xs text-slate-500">{char.id}</div>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-2">2. Exercise Context</h2>
                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                            <h4 className="font-bold text-amber-600">{exercise.title}</h4>
                            <p className="text-sm text-slate-600 mt-1 italic">"{exercise.instruction}"</p>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full mt-6 py-4 bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-100 hover:bg-amber-600 active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {isGenerating ? "Generating..." : "✨ Generate VIP Video"}
                        </button>
                    </section>
                </div>

                {/* Step 2: Output / Preview */}
                <div className="space-y-6">
                    <section className="bg-slate-900 text-slate-300 p-6 rounded-2xl border border-slate-800 shadow-xl min-h-[400px] flex flex-col">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Veo3 Integration Log
                        </h2>
                        <div className="flex-1 font-mono text-xs space-y-2 overflow-y-auto max-h-[300px] scrollbar-hide">
                            {log.length === 0 && <p className="text-slate-600 italic">Ready to generate...</p>}
                            {log.map((line, i) => (
                                <div key={i} className={i === log.length - 1 ? "text-amber-400 font-bold" : ""}>
                                    <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> {line}
                                </div>
                            ))}
                        </div>
                    </section>

                    {generatedVideoUrl && (
                        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-lg animate-in zoom-in-95 duration-500">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                ✅ Preview Ready
                            </h3>
                            <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                                <p className="text-slate-400 font-medium">Video Player Placeholder</p>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button className="flex-1 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors">
                                    Apply to Exercise
                                </button>
                                <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-50">
                                    Regenerate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
