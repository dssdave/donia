import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/vip" className="text-xl font-bold text-amber-500 tracking-tight">
                        Donia VIP
                    </Link>
                    <nav className="hidden md:flex items-center gap-1 ml-4">
                        <Link
                            href="/vip"
                            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/vip/routines"
                            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                        >
                            Routines
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 underline-offset-4 hover:underline"
                    >
                        Back to Game
                    </Link>
                </div>
            </header>
            <main className="flex-1 max-w-7xl w-full mx-auto p-6">
                {children}
            </main>
        </div>
    );
}
