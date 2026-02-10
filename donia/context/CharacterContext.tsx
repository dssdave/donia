"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CharacterId = "bunny" | "fox";

interface Character {
    id: CharacterId;
    name: string;
    avatar: string; // Emoji for now, or small headshot path
    description: string;
    themeColor: string;
}

interface CharacterContextType {
    character: Character;
    setCharacter: (id: CharacterId) => void;
}

const characters: Record<CharacterId, Character> = {
    bunny: {
        id: "bunny",
        name: "Judy B.",
        avatar: "🐰",
        description: "Hop to it! Let's get moving!",
        themeColor: "bg-purple-100",
    },
    fox: {
        id: "fox",
        name: "Nick F.",
        avatar: "🦊",
        description: "Stay cool and stretch it out.",
        themeColor: "bg-orange-100",
    },
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
    const [characterId, setCharacterId] = useState<CharacterId>("bunny");

    const setCharacterIDWrapper = (id: CharacterId) => {
        setCharacterId(id);
    }

    return (
        <CharacterContext.Provider
            value={{ character: characters[characterId], setCharacter: setCharacterIDWrapper }}
        >
            {children}
        </CharacterContext.Provider>
    );
}

export function useCharacter() {
    const context = useContext(CharacterContext);
    if (context === undefined) {
        throw new Error("useCharacter must be used within a CharacterProvider");
    }
    return context;
}

export const CHARACTERS = Object.values(characters);
