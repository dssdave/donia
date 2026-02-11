import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { CharacterProvider } from "@/context/CharacterContext";
import { GameProvider } from "@/context/GameContext";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donia | Stretch & Grow",
  description: "Fun stretching for kids!",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.className} bg-gray-100 flex justify-center items-center min-h-screen`}>
        <div className="mobile-container">
          <CharacterProvider>
            <GameProvider>
              {children}
            </GameProvider>
          </CharacterProvider>
        </div>
      </body>
    </html>
  );
}
