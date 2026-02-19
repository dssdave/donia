import { routines } from "@/lib/data/routines";
import { GuidedPlayer } from "@/components/GuidedPlayer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Correctly define props as a Promise for dynamic routes in Next.js 15+ (if applicable) or standard params
// Since create-next-app might use latest next types, params is a Promise in newer versions.
// However, standard Next.js 14 app router usually: { params: { id: string } }
// But recent changes made params a Promise. To be safe, I'll await it or treat it as such if needed.
// Actually, in the latest Next.js canary/beta, params is a promise. In 14 it's not.
// Given "npx create-next-app@latest" was run, it might be 15.
// I'll check package.json to be sure. It said "next": "16.1.6" ?!
// Wait, Next.js 16 isn't out ?? (My knowledge cut off).
// Ah users `package.json` said `"next": "16.1.6"`.
// If it is Next 15/16, params is async.

export default async function RoutinePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const routine = routines.find((r) => r.id === params.id);

    if (!routine) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
            <header className="mb-6 flex items-center">
                <Link
                    href="/"
                    className="p-2 -ml-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-brand-text" />
                </Link>
                <h1 className="ml-2 font-bold text-lg text-brand-text border-b-2 border-transparent">
                    {routine.title}
                </h1>
            </header>

            <main className="flex-1">
                <GuidedPlayer routine={routine} />
            </main>
        </div>
    );
}

// Generate static params for all routines
export async function generateStaticParams() {
    return routines.map((routine) => ({
        id: routine.id,
    }));
}
