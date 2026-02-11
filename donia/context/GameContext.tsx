"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { routines, Routine } from "@/lib/data/routines";
import { useCharacter } from "./CharacterContext";

type GameState = "idle" | "playing" | "won" | "lost";

interface GameContextType {
    currentLevel: number;
    opponentPositions: Record<string, number>;
    gameState: GameState;
    currentRoutine: Routine | null;
    startLevel: (levelIndex: number) => void;
    completeLevel: (success: boolean) => void;
    exitLevel: () => void;
    resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const { character: playerChar, setCharacter } = useCharacter();
    const [currentLevel, setCurrentLevel] = useState(0); // 0 to 9
    const [opponentPositions, setOpponentPositions] = useState<Record<string, number>>({});
    const [gameState, setGameState] = useState<GameState>("idle");
    const [currentRoutine, setCurrentRoutine] = useState<Routine | null>(null);

    // Initialize opponents (characters not picked by player)
    useEffect(() => {
        const initialOpponents: Record<string, number> = {};
        // In a real app we'd get all characters, but for now we know it's bunny/fox
        const allChars = ["bunny", "fox"];
        allChars.forEach(id => {
            if (id !== playerChar.id) {
                initialOpponents[id] = 0;
            }
        });
        setOpponentPositions(initialOpponents);
    }, [playerChar.id]);

    const startLevel = (levelIndex: number) => {
        if (levelIndex > currentLevel) return; // Can't play locked levels
        setCurrentRoutine(routines[levelIndex] || null);
        setGameState("playing");
    };

    const completeLevel = (success: boolean) => {
        if (success) {
            // currentRoutine is the one being played (index 0-9)
            // If we finish routine i, we move to position i+1
            const finishedLevelIndex = routines.indexOf(currentRoutine!);
            if (finishedLevelIndex + 1 > currentLevel) {
                setCurrentLevel(finishedLevelIndex + 1);
            }

            if (currentLevel >= 10 && finishedLevelIndex === 9) {
                setGameState("won");
            }
            advanceOpponents();
        } else {
            setGameState("lost");
        }
    };

    const exitLevel = () => {
        setGameState("idle");
        setCurrentRoutine(null);
    };

    const advanceOpponents = () => {
        setOpponentPositions(prev => {
            const next = { ...prev };
            Object.keys(next).forEach(id => {
                // Opponents have a 70% chance to move forward
                if (Math.random() > 0.3 && next[id] < 11) {
                    next[id] += 1;
                }
            });
            return next;
        });
    };

    const resetGame = () => {
        setCurrentLevel(0);
        setGameState("idle");
        // Reset opponents
        const initialOpponents: Record<string, number> = {};
        const allChars = ["bunny", "fox"];
        allChars.forEach(id => {
            if (id !== playerChar.id) {
                initialOpponents[id] = 0;
            }
        });
        setOpponentPositions(initialOpponents);
    };

    return (
        <GameContext.Provider
            value={{
                currentLevel,
                opponentPositions,
                gameState,
                currentRoutine,
                startLevel,
                completeLevel,
                exitLevel,
                resetGame
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}
