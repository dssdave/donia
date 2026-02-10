"use client";

import { useCharacter, CHARACTERS } from "@/context/CharacterContext";
import { motion, AnimatePresence } from "framer-motion";
import { PastelButton } from "./ui/PastelButton";
import { useState } from "react";

export function CharacterSelector() {
    const { character: activeCharacter, setCharacter } = useCharacter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative z-50">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
                <span className="text-2xl">{activeCharacter.avatar}</span>
                <span className="font-bold text-sm text-brand-text">
                    {activeCharacter.name}
                </span>
            </button>

            {/* Dropdown / Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        />

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute top-12 right-0 w-64 bg-white rounded-2xl shadow-xl p-4 z-50 flex flex-col gap-2"
                        >
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                                Choose Partner
                            </h3>
                            {CHARACTERS.map((char) => (
                                <button
                                    key={char.id}
                                    onClick={() => {
                                        setCharacter(char.id);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${activeCharacter.id === char.id
                                        ? "bg-brand-pink/10 ring-2 ring-brand-pink"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-2xl">
                                        {char.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-brand-text">{char.name}</div>
                                        <div className="text-xs text-gray-500 line-clamp-1">
                                            {char.description}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
