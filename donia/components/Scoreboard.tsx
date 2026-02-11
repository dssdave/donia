"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { useCharacter, CHARACTERS } from "@/context/CharacterContext";

export function Scoreboard() {
    const { currentLevel, opponentPositions } = useGame();
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
        <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-3xl shadow-lg border-2 border-brand-pink/10 flex items-center gap-6">
            <h3 className="text-[10px] font-black text-brand-pink uppercase tracking-widest border-r border-brand-pink/20 pr-4 mr-2">
                Race Status
            </h3>
            <div className="flex items-center gap-6">
                {allPositions.map((p) => (
                    <div key={p.id} className={`flex items-center gap-2 ${p.isPlayer ? "scale-105" : "opacity-70"}`}>
                        <div className="relative">
                            <span className="text-2xl">{p.avatar}</span>
                            {p.isPlayer && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black leading-tight text-brand-text">{p.name}</span>
                            <span className="text-[10px] font-bold text-gray-400">Space {p.pos + 1}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
