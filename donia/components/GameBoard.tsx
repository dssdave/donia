"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { useCharacter, CHARACTERS } from "@/context/CharacterContext";
import { GameSprite } from "./GameSprite";
import { motion } from "framer-motion";
import { routines } from "@/lib/data/routines";

// Path coordinates for START + 10 levels + FINISH
const PATH = [
    { x: 150, y: 1100 }, // START (index 0)
    { x: 150, y: 880 },  // Level 1 (index 1)
    { x: 220, y: 780 },  // Level 2
    { x: 250, y: 680 },  // Level 3
    { x: 100, y: 580 },  // Level 4
    { x: 50, y: 480 },   // Level 5
    { x: 180, y: 380 },  // Level 6
    { x: 250, y: 280 },  // Level 7
    { x: 120, y: 180 },  // Level 8
    { x: 50, y: 100 },   // Level 9
    { x: 150, y: 50 },   // Level 10
    { x: 150, y: 10 },   // FINISH (index 11)
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
        <div className="relative w-full min-h-[1200px] bg-[#4ade80] rounded-t-[50px] mt-8 overflow-hidden border-t-8 border-[#2d5a27] shadow-2xl">
            {/* 3D Grass Background Effect */}
            <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#2d5a27 1px, transparent 1px)',
                    backgroundSize: '15px 15px',
                    backgroundColor: '#4ade80'
                }} />
            <div className="absolute inset-0 bg-gradient-to-b from-green-600/20 to-transparent pointer-events-none" />

            {/* Winding Brick Road Background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 1200">
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

            {/* Rainbow behind Space 1 */}
            <div
                className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl drop-shadow-md animate-bounce pointer-events-none opacity-80 z-0"
                style={{ left: `${(PATH[1].x / 300) * 100}%`, top: PATH[1].y }}
            >
                🌈
            </div>

            {/* START Area - Wooden Plank Aesthetic */}
            <div
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-start pt-2"
                style={{ left: `${(PATH[0].x / 300) * 100}%`, top: PATH[0].y, width: 160, height: 120 }}
            >
                {/* Wooden Plank Background */}
                <div className="absolute inset-0 bg-[#8b5a2b] rounded-xl border-b-8 border-[#5d3a1a] shadow-2xl" />
                <div className="absolute inset-0 bg-white/5 pointer-events-none rounded-xl" />

                {/* Labels */}
                <span className="relative z-10 text-[#f3e5ab] font-black text-[10px] uppercase tracking-[0.2em] opacity-80 mb-1">
                    Ready to Race?
                </span>
                <span className="relative z-10 text-white font-black text-xl uppercase tracking-widest drop-shadow-md">
                    Start
                </span>

                {/* Plank Detail Lines */}
                <div className="absolute left-4 top-1/2 right-4 h-[1px] bg-black/10 z-0" />
                <div className="absolute left-4 top-1/3 right-4 h-[1px] bg-black/10 z-0" />
            </div>

            {/* Spaces */}
            {routines.map((routine, index) => {
                const roadIndex = index + 1;
                const pos = PATH[roadIndex];

                // Logic:
                // isCompleted: Level already passed by character
                // isCurrent: Character is standing on this space
                // isPlayable: Available to click (Next or Completed)
                // isLocked: Not reached yet

                const isCompleted = (index + 1) < currentLevel;
                const isCurrent = (index + 1) === currentLevel;
                const isLocked = index > currentLevel;

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
                                isCurrent ? "bg-amber-100 border-brand-pink text-brand-pink ring-4 ring-brand-pink/30 z-10 scale-110 shadow-[0_8px_0_rgba(190,24,93,0.2)]" :
                                    isCompleted ? "bg-amber-100 border-amber-300 text-amber-900" :
                                        "bg-slate-300 border-slate-400 text-slate-500 shadow-none"}`}
                        style={{ left: `${(pos.x / 300) * 100}%`, top: pos.y }}
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
                style={{ left: `${(PATH[11].x / 300) * 100}%`, top: PATH[11].y }}
            >
                🏁
            </motion.div>

            {/* Characters */}
            {allPositions.map((char) => {
                const charsOnSameSpace = allPositions.filter(c => c.pos === char.pos);
                const charIndexOnSpace = charsOnSameSpace.findIndex(c => c.id === char.id);
                const offsetX = charsOnSameSpace.length > 1 ? (charIndexOnSpace - (charsOnSameSpace.length - 1) / 2) * 50 : 0;

                // Vertical offset for START area
                const offsetY = char.pos === 0 ? 30 : 0;

                return (
                    <GameSprite
                        key={char.id}
                        characterId={char.id}
                        position={{
                            x: ((PATH[char.pos].x + offsetX) / 300) * 100,
                            y: PATH[char.pos].y + offsetY
                        }}
                        isPlayer={char.isPlayer}
                    />
                );
            })}

            {/* Rich Decorations */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl drop-shadow-md animate-bounce pointer-events-none" style={{ left: '85%', top: 120 }}>🌲</div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl drop-shadow-md pointer-events-none" style={{ left: '90%', top: 320 }}>🏕️</div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl drop-shadow-md animate-pulse pointer-events-none" style={{ left: '10%', top: 520 }}>🌻</div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl drop-shadow-md pointer-events-none" style={{ left: '15%', top: 720 }}>🍄</div>
            <div className="absolute top-[100px] right-20 text-4xl opacity-40">☁️</div>
            <div className="absolute top-[350px] left-20 text-4xl opacity-40 animate-pulse">☁️</div>
        </div>
    );
}
