"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routine } from "@/lib/data/routines";
import { PastelButton } from "./ui/PastelButton";
import { Trophy, Timer, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

interface GuidedPlayerProps {
    routine: Routine;
}

export function GuidedPlayer({ routine }: GuidedPlayerProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const currentStep = routine.steps[currentStepIndex];

    // Start timer when step changes
    useEffect(() => {
        if (isCompleted) return;
        setTimeLeft(currentStep.duration);
        setIsPlaying(true);
    }, [currentStepIndex, currentStep, isCompleted]);

    // Timer logic
    useEffect(() => {
        if (!isPlaying || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsPlaying(false);
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
                    You completed the {routine.title} routine. Amazing job!
                </p>
                <Link href="/">
                    <PastelButton>Back to Home</PastelButton>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                <motion.div
                    className={`h-full rounded-full ${routine.color.replace("bg-", "bg-")}`} // Simplification for now, assuming color is bg-class
                    style={{ backgroundColor: "var(--color-brand-pink)" }} // Fallback
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
                        {/* Instruction/Visual Placeholder */}
                        <div className="aspect-square bg-white rounded-3xl shadow-sm border-2 border-gray-100 flex items-center justify-center mb-8 relative overflow-hidden">
                            <span className="text-6xl animate-pulse">🧘‍♀️</span>
                            {/* Overlay Timer if active */}
                            {isPlaying && (
                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-brand-text font-bold flex items-center gap-2">
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
                        onClick={skipTimer}
                        variant="secondary"
                        className="w-full justify-center"
                    >
                        Skip Timer ({timeLeft}s)
                    </PastelButton>
                ) : (
                    <PastelButton
                        onClick={handleNext}
                        className="w-full justify-center"
                        icon
                    >
                        {currentStepIndex === routine.steps.length - 1
                            ? "Finish Routine"
                            : "Next Stretch"}
                    </PastelButton>
                )}
            </div>
        </div>
    );
}
