"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routine } from "@/lib/data/routines";
import { PastelButton } from "./ui/PastelButton";
import { Trophy, Timer } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useCharacter } from "@/context/CharacterContext";
import { useGame } from "@/context/GameContext";
import Image from "next/image";
import { XCircle, AlertCircle } from "lucide-react";

interface GuidedPlayerProps {
    routine: Routine;
}

export function GuidedPlayer({ routine }: GuidedPlayerProps) {
    const { character } = useCharacter();
    const { completeLevel, exitLevel } = useGame();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    const currentStep = routine.steps[currentStepIndex];

    // Map routine step IDs to asset names
    const getImagePath = (stepId: string) => {
        const assetMap: Record<string, string> = {
            "neck-roll": "neck-roll",
            "sky-reach": "sky-reach",
            "toe-touch": "toe-touch"
        };

        const assetName = assetMap[stepId] || "neck-roll";
        // If character is bunny, use asset. If fox, we don't have assets yet, so we could fallback
        // But for now let's point to the path. Next/Image onError will handle missing ones.
        return `/assets/characters/${character.id}/${assetName}.png`;
    };

    useEffect(() => {
        if (isCompleted || isFailed) return;
        setTimeLeft(currentStep.duration);
        setIsPlaying(true);
    }, [currentStepIndex, currentStep, isCompleted, isFailed]);

    useEffect(() => {
        if (!isPlaying || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsPlaying(false);
                    // FAILURE CONDITION: Timer ran out before user finished
                    setIsFailed(true);
                    completeLevel(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    const handleNext = () => {
        if (currentStepIndex < routine.steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            setIsCompleted(true);
            completeLevel(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#FFB7B2", "#B5EAD7", "#E2F0CB"],
            });
        }
    };

    const skipTimer = () => {
        setTimeLeft(0);
        setIsPlaying(false);
    };

    if (isFailed) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-6 p-6 bg-red-100 rounded-full"
                >
                    <XCircle className="w-16 h-16 text-red-500" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-4 text-brand-text">
                    Out of Time! ⏰
                </h2>
                <p className="text-gray-500 mb-8">
                    Don't give up! You didn't get the point this time, but you can try again.
                </p>
                <PastelButton variant="secondary" onClick={exitLevel}>
                    Back to Board
                </PastelButton>
            </div>
        );
    }

    if (isCompleted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-6 p-6 bg-brand-pink/20 rounded-full"
                >
                    <Trophy className="w-16 h-16 text-brand-pink" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-4 text-brand-text">
                    Smashed it! 🎉
                </h2>
                <p className="text-gray-500 mb-8">
                    You completed the level and moved forward on the board!
                </p>
                <PastelButton onClick={exitLevel}>
                    Back to Board
                </PastelButton>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                <motion.div
                    className={`h-full rounded-full ${routine.color.replace("bg-", "bg-")}`}
                    style={{ backgroundColor: "var(--color-brand-pink)" }}
                    initial={{ width: 0 }}
                    animate={{
                        width: `${((currentStepIndex + 1) / routine.steps.length) * 100}%`,
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full"
                    >
                        {/* Instruction/Visual Area */}
                        <div className="aspect-square bg-white rounded-3xl shadow-sm border-2 border-gray-100 flex items-center justify-center mb-8 relative overflow-hidden">
                            <div className="relative w-full h-full p-6">
                                {/* Image Container with Fallback logic via CSS/JS or just render */}
                                <Image
                                    src={getImagePath(currentStep.id)}
                                    alt={currentStep.title}
                                    fill
                                    className="object-contain"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    onError={(e) => {
                                        // Very basic fallback: hide image, show emoji
                                        const target = e.target as HTMLImageElement;
                                        target.style.opacity = '0';
                                        const parent = target.parentElement?.parentElement;
                                        if (parent) {
                                            // Create a span only if it doesn't exist
                                            if (!parent.querySelector('.fallback-emoji')) {
                                                const span = document.createElement('span');
                                                span.className = 'fallback-emoji text-6xl animate-pulse absolute inset-0 flex items-center justify-center';
                                                span.innerText = '🧘‍♀️'; // Default emoji
                                                parent.appendChild(span);
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* Overlay Timer if active */}
                            {isPlaying && (
                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-brand-text font-bold flex items-center gap-2 z-10">
                                    <Timer className="w-4 h-4" />
                                    {timeLeft}s
                                </div>
                            )}
                        </div>

                        <h2 className="text-2xl font-bold text-center mb-4 text-brand-text">
                            {currentStep.title}
                        </h2>
                        <p className="text-center text-gray-500 text-lg mb-8">
                            {currentStep.instruction}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-auto py-6">
                {timeLeft > 0 ? (
                    <PastelButton
                        onClick={handleNext}
                        className="w-full justify-center"
                        icon
                    >
                        {currentStepIndex === routine.steps.length - 1
                            ? "I'm Done! Finish level"
                            : "I'm Done! Next Stretch"}
                    </PastelButton>
                ) : (
                    <div className="flex items-center justify-center gap-2 p-4 bg-red-50 text-red-500 rounded-2xl font-bold animate-pulse">
                        <AlertCircle className="w-5 h-5" />
                        Time's Up!
                    </div>
                )}
            </div>
        </div>
    );
}
