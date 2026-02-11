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

export default function Home() {
  const { gameState, currentRoutine, resetGame } = useGame();

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
      <header className="mb-8 flex flex-col items-center">
        <div className="w-full flex justify-end mb-2">
          <CharacterSelector />
        </div>
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-brand-pink/20">
          <Sparkles className="w-6 h-6 text-brand-pink" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-brand-text">
          Donia Road <span className="inline-block animate-bounce">✨</span>
        </h1>
        <p className="text-gray-500 text-center">Beat your friends to the finish line!</p>
      </header>

      {/* Game Board */}
      <section className="px-2">
        <h2 className="text-xl font-bold mb-4">Level Road 🗺️</h2>
        <GameBoard />
      </section>

      {/* Quick Tips / Fun Section */}
      <section className="mt-10 p-6 rounded-3xl bg-brand-lavender text-brand-text text-center">
        <h3 className="font-bold mb-2">💡 Daily Tip</h3>
        <p className="text-sm opacity-80">
          "Don't forget to breathe deep like a balloon!" 🎈
        </p>
      </section>
    </main>
  );
}
