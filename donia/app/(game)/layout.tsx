import { CharacterProvider } from "@/context/CharacterContext";
import { GameProvider } from "@/context/GameContext";

export default function GameLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mobile-container overflow-y-auto">
            <CharacterProvider>
                <GameProvider>
                    {children}
                </GameProvider>
            </CharacterProvider>
        </div>
    );
}
