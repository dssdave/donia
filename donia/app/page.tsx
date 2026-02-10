import { routines } from "@/lib/data/routines";
import { RoutineCard } from "@/components/RoutineCard";
import { Sparkles } from "lucide-react";
import { CharacterSelector } from "@/components/CharacterSelector";

export default function Home() {
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
          Hi, Superstar! <span className="inline-block animate-bounce">✨</span>
        </h1>
        <p className="text-gray-500">Ready to stretch today?</p>
      </header>

      {/* Routine Grid */}
      <section>
        <h2 className="text-xl font-bold mb-4 px-2">Your Routines</h2>
        <div className="space-y-4">
          {routines.map((routine) => (
            <RoutineCard key={routine.id} routine={routine} />
          ))}
        </div>
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
