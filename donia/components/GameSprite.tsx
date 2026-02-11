"use client";

import { motion } from "framer-motion";
import { CHARACTERS } from "@/context/CharacterContext";

interface GameSpriteProps {
    characterId: string;
    position: { x: number; y: number };
    isPlayer?: boolean;
}

export function GameSprite({ characterId, position, isPlayer }: GameSpriteProps) {
    const character = CHARACTERS.find(c => c.id === characterId);

    if (!character) return null;

    return (
        <motion.div
            animate={{ left: `${position.x}%`, top: position.y }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none`}
            style={{ top: 0 }}
        >
            <div className={`text-4xl ${isPlayer ? "scale-125" : "scale-100 opacity-70"}`}>
                {character.avatar}
            </div>
            {isPlayer && (
                <div className="bg-brand-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 shadow-sm">
                    YOU
                </div>
            )}
        </motion.div>
    );
}
