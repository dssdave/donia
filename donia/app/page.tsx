"use client";

import { routines } from "@/lib/data/routines";
import { Sparkles, Trophy } from "lucide-react";
import { CharacterSelector } from "@/components/CharacterSelector";
import { GameBoard } from "@/components/GameBoard";
import { useGame } from "@/context/GameContext";
import { GuidedPlayer } from "@/components/GuidedPlayer";
import { PastelButton } from "@/components/ui/PastelButton";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useCharacter, CHARACTERS } from "@/context/CharacterContext";
import { Scoreboard } from "@/components/Scoreboard";

export default function Home() {
  const { gameState, currentRoutine, resetGame, currentLevel } = useGame();
  const { hasChosenCharacter, setHasChosenCharacter, setCharacter } = useCharacter();

  useEffect(() => {
    if (gameState === "won") {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#FFA500", "#FF6347"],
      });
    }
  }, [gameState]);

  // Onboarding Screen
  if (!hasChosenCharacter) {
    return (
      <main className="p-8 min-h-screen bg-white flex flex-col items-center justify-center text-center">
        <div className="mb-8 p-6 bg-brand-pink/20 rounded-full animate-bounce">
          <Sparkles className="w-16 h-16 text-brand-pink" />
        </div>
        <h1 className="text-4xl font-black mb-4 text-brand-text">
          Exercise for Kids
        </h1>
        <p className="text-xl text-gray-500 mb-12">Choose your character to start!</p>

        <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
          {CHARACTERS.map((char) => (
            <button
              key={char.id}
              onClick={() => {
                setCharacter(char.id);
                setHasChosenCharacter(true);
              }}
              className="bg-gray-50 p-6 rounded-3xl border-2 border-transparent hover:border-brand-pink hover:bg-white transition-all text-left flex items-center gap-6 shadow-sm hover:shadow-md"
            >
              <span className="text-5xl">{char.avatar}</span>
              <div>
                <h3 className="text-xl font-bold text-brand-text">{char.name}</h3>
                <p className="text-sm text-gray-500">{char.description}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
    );
  }

  if (gameState === "playing" && currentRoutine) {
    return (
      <main className="min-h-screen bg-white p-6">
        <GuidedPlayer routine={currentRoutine} />
      </main>
    );
  }

  if (gameState === "won") {
    return (
      <main className="min-h-screen bg-brand-lavender p-8 flex flex-col items-center justify-center text-center">
        <div className="mb-8 p-8 bg-white rounded-full shadow-xl">
          <Trophy className="w-24 h-24 text-brand-pink animate-bounce" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-brand-text">
          CHAMPION! 🏆
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          You finished the entire road! You're a stretching superstar!
        </p>
        <PastelButton onClick={resetGame}>
          Play Again!
        </PastelButton>
      </main>
    );
  }

  return (
    <main className="p-6 min-h-screen bg-white">
      {/* Header */}
      <header className="mb-8 flex flex-col items-center gap-4">
        <div className="flex flex-col items-stretch gap-4 w-full max-w-sm">
          <Scoreboard />

          <div className="bg-white/95 backdrop-blur-md px-8 py-5 rounded-[40px] shadow-lg border-2 border-brand-pink/10 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center p-3 mb-3 rounded-full bg-brand-pink/20">
              <Sparkles className="w-6 h-6 text-brand-pink" />
            </div>
            <h1 className="text-3xl font-black mb-1 text-brand-text leading-none">
              Game <span className="inline-block animate-bounce">✨</span>
            </h1>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">
              Beat your friends to the finish line!
            </p>
          </div>
        </div>
      </header>

      {/* Game Board */}
      <section className="px-2">
        <h2 className="text-xl font-bold mb-4">Level {currentLevel + 1}</h2>
        <GameBoard />
      </section>
    </main>
  );
}
