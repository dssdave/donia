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

    // Combined positions for scoreboard
    const allPositions = [
        { id: playerChar.id, name: "You", pos: currentLevel, avatar: playerChar.avatar, isPlayer: true },
        ...Object.entries(opponentPositions).map(([id, pos]) => ({
            id,
            name: CHARACTERS.find(c => c.id === id)?.name || id,
            pos,
            avatar: CHARACTERS.find(c => c.id === id)?.avatar || "❓",
            isPlayer: false
        }))
    ].sort((a, b) => b.pos - a.pos);

    return (
        <div className="relative w-full min-h-[950px] bg-[#4ade80] rounded-t-[50px] mt-8 overflow-hidden border-t-8 border-[#2d5a27] shadow-2xl">
            {/* 3D Grass Background Effect */}
            <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#2d5a27 1px, transparent 1px)',
                    backgroundSize: '15px 15px',
                    backgroundColor: '#4ade80'
                }} />
            <div className="absolute inset-0 bg-gradient-to-b from-green-600/20 to-transparent pointer-events-none" />

            {/* Winding Brick Road Background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 950">
                <defs>
                    <pattern id="bricks" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <rect width="10" height="10" fill="#cc7a00" />
                        <path d="M 0 5 L 10 5 M 5 0 L 5 5 M 5 5 L 5 10" stroke="#a36200" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <path
                    d={`M ${PATH.map(p => `${p.x},${p.y}`).join(" L ")}`}
                    fill="none"
                    stroke="#cc7a00"
                    strokeWidth="50"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d={`M ${PATH.map(p => `${p.x},${p.y}`).join(" L ")}`}
                    fill="none"
                    stroke="url(#bricks)"
                    strokeWidth="40"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d={`M ${PATH.map(p => `${p.x},${p.y}`).join(" L ")}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="5 10"
                    className="opacity-30"
                />
            </svg>

            {/* Spaces */}
            {routines.map((routine, index) => {
                // Uniform square shapes with bevel
                const pos = PATH[index];
                const isLocked = index > currentLevel;
                const isCurrent = index === currentLevel;

                return (
                    <motion.button
                        key={routine.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={!isLocked ? { scale: 1.15 } : {}}
                        whileTap={!isLocked ? { scale: 0.9 } : {}}
                        onClick={() => !isLocked && startLevel(index)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center font-black text-xl shadow-[0_6px_0_rgba(0,0,0,0.2)] border-2 transition-all rounded-xl
                            ${isLocked ? "bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed shadow-none" :
                                isCurrent ? "bg-brand-pink border-white text-white ring-4 ring-white/50 z-10 scale-110 shadow-[0_8px_0_rgba(190,24,93,0.4)]" :
                                    "bg-amber-100 border-amber-300 text-amber-900"}`}
                        style={{ left: pos.x, top: pos.y + 100 }}
                    >
                        {index + 1}
                        {isLocked && <span className="absolute -top-1 -right-1 text-sm bg-white rounded-full p-0.5 shadow-sm">🔒</span>}
                    </motion.button>
                );
            })}

            {/* Finish Line */}
            <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-6xl drop-shadow-lg"
                style={{ left: PATH[10].x, top: PATH[10].y + 100 }}
            >
                🏁
            </motion.div>

            {/* Characters with Offset to prevent overlap */}
            {allPositions.map((char, i) => {
                // Calculation offset: if multiple characters on same space, shift them X
                const charsOnSameSpace = allPositions.filter(c => c.pos === char.pos);
                const charIndexOnSpace = charsOnSameSpace.findIndex(c => c.id === char.id);
                const offsetX = charsOnSameSpace.length > 1 ? (charIndexOnSpace - (charsOnSameSpace.length - 1) / 2) * 50 : 0;

                return (
                    <GameSprite
                        key={char.id}
                        characterId={char.id}
                        position={{
                            x: PATH[char.pos].x + offsetX,
                            y: PATH[char.pos].y + 100
                        }}
                        isPlayer={char.isPlayer}
                    />
                );
            })}

            {/* Rich Decorations */}
            <div className="absolute top-40 left-10 text-5xl drop-shadow-md animate-bounce">🌲</div>
            <div className="absolute top-[250px] right-8 text-5xl drop-shadow-md">🏕️</div>
            <div className="absolute top-[450px] left-4 text-5xl drop-shadow-md animate-pulse">🌻</div>
            <div className="absolute top-[600px] right-12 text-5xl drop-shadow-md">🍄</div>
            <div className="absolute top-[800px] left-14 text-5xl drop-shadow-md animate-bounce">🌈</div>
            <div className="absolute top-[100px] right-20 text-4xl opacity-40">☁️</div>
            <div className="absolute top-[350px] left-20 text-4xl opacity-40 animate-pulse">☁️</div>
        </div>
    );
}
