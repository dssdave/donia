import Link from "next/link";
import { Play } from "lucide-react";
import { Routine } from "@/lib/data/routines";

interface RoutineCardProps {
    routine: Routine;
}

export function RoutineCard({ routine }: RoutineCardProps) {
    return (
        <Link href={`/routines/${routine.id}`} className="block group">
            <div
                className={`relative overflow-hidden rounded-3xl p-6 ${routine.color} text-white shadow-lg transition-transform hover:scale-[1.02]`}
            >
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-1">{routine.title}</h3>
                    <p className="opacity-90 text-sm mb-4">{routine.duration}</p>
                    <p className="text-sm font-medium opacity-80 mb-6 max-w-[80%]">
                        {routine.description}
                    </p>

                    <div className="bg-white/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 fill-current" />
                    </div>
                </div>

                {/* Decorative circle */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            </div>
        </Link>
    );
}
