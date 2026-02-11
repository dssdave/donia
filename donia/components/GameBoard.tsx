"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { useCharacter, CHARACTERS } from "@/context/CharacterContext";
import { GameSprite } from "./GameSprite";
import { motion } from "framer-motion";
import { routines } from "@/lib/data/routines";

// Path coordinates for 10 spaces (0-9)
const PATH = [
    { x: 150, y: 750 }, // Start
    { x: 250, y: 680 },
    { x: 100, y: 610 },
    { x: 200, y: 540 },
    { x: 280, y: 470 },
    { x: 100, y: 400 },
    { x: 50, y: 330 },
    { x: 180, y: 260 },
    { x: 250, y: 190 },
    { x: 120, y: 120 },
    { x: 150, y: 50 },  // Finish
];

export function GameBoard() {
    const { currentLevel, opponentPositions, startLevel } = useGame();
    const { character: playerChar } = useCharacter();

    return (
        <div className="relative w-full min-h-[850px] bg-sky-50 rounded-t-[40px] mt-8 overflow-hidden border-t-4 border-white shadow-inner">
            {/* Winding Path Background (Simplified SVG) */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 300 850">
                <path
                    d={`M ${PATH.map(p => `${p.x},${p.y}`).join(" L ")}`}
                    fill="none"
                    stroke="#FF8EAF"
                    strokeWidth="40"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d={`M ${PATH.map(p => `${p.x},${p.y}`).join(" L ")}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="30"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="10 15"
                />
            </svg>

            {/* Spaces */}
            {routines.map((routine, index) => {
                const pos = PATH[index];
                const isLocked = index > currentLevel;
                const isCurrent = index === currentLevel;

                return (
                    <motion.button
                        key={routine.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => !isLocked && startLevel(index)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 transition-all
                            ${isLocked ? "bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed" :
                                isCurrent ? "bg-brand-pink border-white text-white scale-110 z-10" :
                                    "bg-brand-teal border-white text-white"}`}
                        style={{ left: pos.x, top: pos.y }}
                    >
                        {index + 1}
                        {isLocked && <span className="absolute -top-1 -right-1 text-xs">🔒</span>}
                    </motion.button>
                );
            })}

            {/* Finish Line */}
            <div
                className="absolute -translate-x-1/2 -translate-y-1/2 text-4xl"
                style={{ left: PATH[10].x, top: PATH[10].y }}
            >
                🏁
            </div>

            {/* Player Sprite */}
            <GameSprite
                characterId={playerChar.id}
                position={PATH[currentLevel]}
                isPlayer={true}
            />

            {/* Opponent Sprites */}
            {Object.entries(opponentPositions).map(([id, posIndex]) => (
                <GameSprite
                    key={id}
                    characterId={id}
                    position={PATH[posIndex]}
                />
            ))}

            {/* Decorations */}
            <div className="absolute top-20 left-10 text-4xl opacity-50 animate-bounce delay-100">🌳</div>
            <div className="absolute top-150 right-10 text-4xl opacity-50 animate-bounce delay-300">🌸</div>
            <div className="absolute top-300 left-5 text-4xl opacity-50 animate-bounce delay-500">🌳</div>
            <div className="absolute top-500 right-5 text-4xl opacity-50 animate-bounce delay-200">🍄</div>
            <div className="absolute top-700 left-8 text-4xl opacity-50 animate-bounce delay-400">🌷</div>
        </div>
    );
}
